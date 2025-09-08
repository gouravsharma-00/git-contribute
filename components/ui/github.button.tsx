"use client"
import React from 'react'
import { signIn, useSession, signOut } from 'next-auth/react'


export default function GitHubButton() {
    const {data : session} = useSession()

  const handleGit = async () => {
    if (!session) {
      await signIn("github", { callbackUrl: "/client" });

    } else {
      await signOut({ callbackUrl: "/" });
    }
  };

    return(
        <div onClick={handleGit}
        style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                flexDirection: 'column',
                gap:'0.45rem',
                maxWidth: '80px',
                textAlign: 'right'
            }}>
            <button style={{
                padding: '0.25rem'
            }}>Github</button>
            <span>Try github {session ? 'logOut' : 'login'}</span>

        </div>
    )
}