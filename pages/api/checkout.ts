import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { GetProductBySlugDocument, GetProductBySlugQuery, GetProductBySlugQueryVariables } from "../../generated/graphql";
import { apolloClient } from "../../graphql/apolloClient";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

interface BodyRequest {
    slug: string
    count: number
}

const checkoutHandler: NextApiHandler = async (req, res) => {
    if(!STRIPE_SECRET_KEY){
        res.status(500).json({ message: 'Missing STRIPE_SECRET_KEY'})
        return
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })

    const body: BodyRequest[] = req.body

    const products = await Promise.all(body.map(async (item) => {
        const product = await apolloClient.query<GetProductBySlugQuery, GetProductBySlugQueryVariables>({
            query: GetProductBySlugDocument,
            variables: {
                slug: item.slug
            }
        })

        return {
            ...product,
            count: item.count
        }
    }))

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        locale: 'pl',
        payment_method_types: ['p24', 'card'],
        success_url: 'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/checkout/cancel',
        line_items: products.map(item => {
            return {
                price_data: {
                    currency: 'PLN',
                    unit_amount: item.data.product?.price,
                    product_data: {
                        name: item.data.product!.name,
                        images: item.data.product?.images.map(source => source.url)
                    }
             },
             quantity: item.count
            }
        }),
    })

    res.status(201).json({
        session: stripeCheckoutSession
    })

}

export default checkoutHandler;