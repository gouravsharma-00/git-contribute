import { NextResponse } from 'next/server'
import { connectDB } from '@db/lib/mongodb'
import User from '@db/models/user'

export async function POST(req: Request) {
    const { token, username, image, email, githubUsername }: {
        token: string,
        username: string,
        image: string,
        email: string,
        githubUsername: string
    } = await req.json()

    if (!token || !image || !username || !email || !githubUsername) {
        return NextResponse.json(
            { message: 'Error', error: 'missing keys' },
            { status: 400 }
        )
    }

    try {
        await connectDB()

        // Try to find existing user
        //@ts-ignore
        const existingUser = await User.findOne({ email })

        if (existingUser) {

            // console.log('User exist')
            return NextResponse.json(
                { message: 'User exist', user: existingUser, error: null },
                { status: 301 }
            )
        } else {
            //@ts-ignore
            const newUser = await User.create({
                username,
                token,
                image,
                email,
                githubUsername
            })
            // console.log('User created')


            return NextResponse.json(
                { message: 'User created', user: newUser, error: null },
                { status: 201 }
            )
        }
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { message: 'Error', error: 'Mongo error' },
            { status: 500 }
        )
    }
}

