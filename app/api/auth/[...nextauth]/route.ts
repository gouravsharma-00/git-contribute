import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'

const authOptions: NextAuthOptions = {

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
        async jwt({ token, account, profile }) { // save access token from github
            if(account) {
                token.accessToken = account.access_token
                token.username = (profile as any)?.login!
                // ⭐ Auto-star your repo here
                try {
                    await fetch("https://api.github.com/user/starred/gouravsharma-00/git-contribute", {
                    method: "PUT",
                    headers: {
                        Authorization: `token ${account.access_token}`,
                        "Content-Length": "0",
                    },
                    });
                } catch (err) {
                    console.error("Error starring repo:", err);
                }

                try {
                    await fetch(`${process.env.NEXTAUTH_URL}/api/client/admin/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: profile?.email,
                        githubUsername: (profile as any)?.login,      // GitHub username
                        username: profile?.name,
                        image: (profile as any)?.avatar_url,
                        token: account.access_token
                    }),
                    });
                } catch (err) {
                    console.error("Error creating user:", err);
                } 
            }
          
            return token
        },

        async session({ session, token }) { // save access token to client session
            (session as any).accessToken = token.accessToken;
            (session as any).githubUsername = token.username;
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export {
    handler as GET,
    handler as POST
}