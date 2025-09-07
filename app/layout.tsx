import React, { JSX } from 'react'

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
            <body>
                {children}
            </body>
        </html>
    )
}