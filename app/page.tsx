import React from 'react'
import GitHubButton from '@ui/github.button'
/**
 * 
 * @returns { JSX.Element } render the root child
 */
export default function RootChild() {
    return(
        <main style={{
            minHeight: '100vh',
            maxWidth: '85%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1rem'
        }}>
            <header style={{
                // color: 'white',
                fontFamily: 'inherit',
                fontWeight: '300',
                
            }}>
                <h2 style={{fontSize: '2rem'}}>Hello,</h2>
                <p>Do you want your github profile to look good? and you are lazy? then you are at the right place</p>
            </header>
            <section style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // padding: '1rem',
            }}>
                <GitHubButton />
                <figure>
                    <img src='/images/git-contribution-chart.svg' alt='contribution chart' 
                    style={{width: "100%", height: "auto",maxWidth: "800px"}} />
                </figure>
            </section>
        </main>
    )
}