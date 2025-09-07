"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import GitHubContribution from '@ui/github.contribution'

export default function ClientPage() {
    const {data: session} = useSession()

    console.log(session)
    if(!session) {
        return(
            <p>Loading...</p>
        )
    }

    return(
        <main style={{
            border: '1px solid white',
            width: '85%',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            <div style={{
                display: 'flex',
                width: '100%'
                
            }}>
                <figure style={{
                    border: '1px #cccccc solid',
                    margin: 'auto'
                }}>
                    <img src={session.user.image} alt='user photo' style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '200px'
                    }} />
                    <figcaption style={{
                        textAlign: 'center'
                    }}>{session.user.name}</figcaption>
                </figure>
                <div style={{
                    display: 'flex',
                    gap: '0.75rem'
                }}>
                    Name: {session.user.name}
                    Email: {session.user.email}
                </div>
            </div>


            <GitHubContribution token={(session as any).accessToken!}/>
            
        </main>
    )
}