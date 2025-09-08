import React from 'react'
import { CatLoader } from '@constants/images'
import Image from 'next/image'
export default function LoadingScreen() {
    return(
        <div style={{
            position: 'absolute',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(5px)',
            pointerEvents: 'none'
        }}>
            <Image src={CatLoader} alt='loading' />

        </div>
    )
}