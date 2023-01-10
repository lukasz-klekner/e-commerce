import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  providers: [
    CredentialsProvider({
        name: "Login with Credentials",
        credentials: {
          username: { label: "Emial", type: "email", placeholder: "example@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const user = { id: "1", password: "123", email: "luki@example.com" }
          // zapytanie do bazy danych, api albo graphcms


    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      })
  ],
}

export default NextAuth(authOptions)