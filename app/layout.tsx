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

                <link rel='icon' href='/icons/favicon.png' />
                <link rel='canonical' href='https://git-contribute.theicedev.tech' />
                <title>git-contribute | Supercharge Your GitHub Contributions</title>

                <meta name="title" content="git-contribute | Supercharge Your GitHub Contributions" />
                <meta name="description" 
                content="Sign in with GitHub and fill your contribution chart (past history included) to make your profile more appealing for recruiters. A fun way to boost your GitHub presence." />
                <meta name="keywords" content="GitHub contributions, GitHub profile booster, contribution chart, open source, recruiters, developer portfolio, git-contribute" />
                <meta name="author" content="git-contribute team" />

                <meta property="og:title" content="git-contribute | Supercharge Your GitHub Contributions" />
                <meta property="og:description" content="Sign in with GitHub and fill your contribution chart — including past history — to make your profile stand out for recruiters." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://git-contribute.theicedev.tech/" />
                <meta property="og:image" content="https://git-contribute.theicedev.tech/preview.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="git-contribute | Supercharge Your GitHub Contributions" />
                <meta name="twitter:description" content="Boost your GitHub profile with a filled contribution chart. Sign in with GitHub and impress recruiters." />
                <meta name="twitter:image" content="https://git-contribute.theicedev.tech/preview.png" />

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