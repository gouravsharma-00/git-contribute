"use client"
import React from 'react'
import { useSession } from 'next-auth/react'

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
            border: '1px solid white'
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
            
        </main>
    )
}