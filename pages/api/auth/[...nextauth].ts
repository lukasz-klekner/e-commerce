import NextAuth from "next-auth"
import * as bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials";
import { GetProfileByEmailDocument, GetProfileByEmailQuery, GetProfileByEmailQueryVariables } from "../../../generated/graphql";
import { authorizedApolloClient } from "../../../graphql/apolloClient";


export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
        name: "Login with Credentials",
        credentials: {
          username: { label: "Emial", type: "email", placeholder: "example@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          if(!credentials) return null;

          const user = await authorizedApolloClient.query<GetProfileByEmailQuery, GetProfileByEmailQueryVariables>({
            query: GetProfileByEmailDocument,
            variables: {
                email: credentials.username
            }
          })

          if(!user.data.profile?.password) return null;

          const arePasswordsEqual = await bcrypt.compare(credentials.password, user.data.profile.password)

          if(!arePasswordsEqual) return null;

          return {
            id: user.data.profile.id,
            email: user.data.profile.email
          }
        }
      })
  ],
}

export default NextAuth(authOptions)