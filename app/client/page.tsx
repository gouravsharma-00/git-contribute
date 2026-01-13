"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import GitHubContribution from '@ui/github.contribution'
import LoadingScreen from '@ui/loading.screen'
import { CatConfuss } from '@constants/images'
import Image from 'next/image'

export default function ClientPage() {
    const {data: session} = useSession()
    const [loading, setLoading] = useState<boolean>(false);
    const handleFillme = async () => {
        setLoading(true);

        const res = await fetch('/api/client/fillchart', {
            method: 'POST',
            body: JSON.stringify({ token: (session as any).accessToken })
        })
        const data = await res.json()

        setLoading(false)
        const mongo = await fetch('/api/client/admin/repoboost', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: session.user.email
                    })
            })

        const response = await mongo.json()
        // console.log(response);
    }

    useEffect(() => {
        if(!session) {
            return
        }
        const mongoPost = async () => {
            const mongo = await fetch('/api/client/admin/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        token: (session as any).accessToken,
                        email: session.user.email,
                        image: session.user.image,
                    })
            })


        }
        mongoPost();
    }, [session])

useEffect(() => {
alert(
  "⚠️ To display all of your contribution activity on GitHub, please enable private contributions in your profile settings:\n\n" +
  "1. Sign in to GitHub.\n" +
  "2. Click your profile photo (top-right) and open Settings.\n" +
  "3. Select 'Profile' from the left menu.\n" +
  "4. Scroll to the 'Contributions & activity' section.\n" +
  "5. Enable 'Include private contributions on my profile'.\n\n" +
  "After enabling this option, refresh this page to see your updated contribution graph."
);
}, []);


    // console.log(session)
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
                justifyContent: 'start',
                alignItems: 'start',
                width: '100%',
                gap: '0.35rem'
                
            }}>
                <figure style={{
                    border: '1px #cccccc solid',
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
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                   <p> Name: {session.user.name}</p>
                    <p>Email: {session.user.email}</p>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.25rem',
                        width: 'fit-content'
                    }}>
                        <button onClick={handleFillme} 
                        style={{
                            padding: '0.35rem',
                            cursor: 'pointer'
                        }}>fill me 💦</button>
                        <button 
                        title='Click on Fill me to fill your contribution chart
                        (50) random contributions to your profile!!completly safe 👱‍♀️'
                        onClick={() => {
                            alert('Click on Fill me to fill your contribution chart (50) random contributions to your profile!!completly safe 👱‍♀️')
                        }}
                        style={{
                            padding: 'none',
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <Image src={CatConfuss} width={30} height={30} alt='know more'/>
                        </button>

                    </div>
                </div>
            </div>


            <GitHubContribution token={(session as any).accessToken!} loading={loading} />

            {
                loading && <LoadingScreen /> 
            }
            
        </main>
    )
}