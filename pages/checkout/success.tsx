import { useRouter } from "next/router"

const CheckoutSuccessPage = () => {
    const router = useRouter()

    console.log(router.query.session_id, 'query')
    return (
        <div>Success!</div>
    )
}

export default CheckoutSuccessPage