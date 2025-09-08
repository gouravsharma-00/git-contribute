import { NextResponse } from 'next/server'
import { connectDB } from '@db/lib/mongodb'
import User from '@db/models/user'

export async function POST(req: Request) {
    const { token, image, email }: {
        token: string,
        image: string,
        email: string
    } = await req.json()

    if (!token || !image || !email) {
        return NextResponse.json(
            { message: 'Error', error: 'missing keys' },
            { status: 400 }
        )
    }

    try {
        await connectDB()

        //@ts-ignore
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            existingUser.lastOnline = new Date()
            existingUser.token = token
            existingUser.image = image

            await existingUser.save()

            return NextResponse.json(
                { message: 'User updated', user: existingUser, error: null },
                { status: 200 }
            )
        } else {
           
            return NextResponse.json(
                { message: 'User does not exist', user: null, error: "User not exist" },
                { status: 401 }
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

