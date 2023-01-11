import { NextApiHandler } from "next"
import * as bcrypt from "bcrypt"
import { authorizedApolloClient } from "../../graphql/apolloClient"
import { CreateProfileDocument, CreateProfileMutation, CreateProfileMutationVariables } from "../../generated/graphql"

const signupHandler: NextApiHandler = async (req, res) => {
    const { email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 12)


    const user = await authorizedApolloClient.mutate<CreateProfileMutation, CreateProfileMutationVariables>(
        {
            mutation: CreateProfileDocument,
            variables: {
                email,
                password: passwordHash
            }
        }
    )

    res.json({
        id: user.data?.user?.id
    })
}

export default signupHandler