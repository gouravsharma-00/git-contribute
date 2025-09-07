import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {

    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params : {
                    scope: "read:user user:email repo public_repo"
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, account }) { // save access token from github
            if(account) {
                token.accessToken = account.access_token
            }
            return token
        },

        async session({ session, token }) { // save access token to client session
            (session as any).accessToken = token.accessToken;
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export {
    handler as GET,
    handler as POST
}