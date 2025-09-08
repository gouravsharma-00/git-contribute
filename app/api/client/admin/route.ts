import { NextResponse } from 'next/server'
import { connectDB } from '@db/lib/mongodb'
import User from '@db/models/user'

export async function POST(req: Request) {
    const { token, username, image } : {
        token : string, username: string, image: string
    } = await req.json()
    if(!token || !image || !username) {
        return NextResponse.json({message: 'Error', error: 'missing keys'}, {status: 400})
    }

    try {
        await connectDB()
        //@ts-ignore
        const user = await User.create({
            username,
            token, 
            image
        })

        return NextResponse.json({message: user, error: null}, {status: 200})
    }catch(err) {
        return NextResponse.json({message: 'Error', error: 'Mongo error'}, {status: 500})
    }
}

export async function GET(req: Request) {
    try {
        await connectDB()
        //@ts-ignore
        const users = await User.find().sort({createdAt: -1})

        return NextResponse.json({message: users, error: null}, {status: 200})
    }catch(err) {
        return NextResponse.json({message: 'Error', error: 'Mongo error in admin'}, {status: 500})
    }
}