"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
/**
 * 
 * @param {{children} : {children: React.ReactNode}} param root child
 * @returns { JSX.Element } render the Root Layout
 */
export default function RootLayout({children}: {children : React.ReactNode}) {
    return(
        <html lang='en'>
            <head>
                <link rel='icon' href='/icons/icon.jpg' />
                <link rel='canonical' href='https://git-contribute.vercel.app' />
                <title>git-contribute | Hack Your System</title>
            </head>
            <body style={{
                backgroundColor: '#0a0a0a',
                color: '#ededed',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}