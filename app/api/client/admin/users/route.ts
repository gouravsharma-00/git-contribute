import { NextResponse } from 'next/server'
import { connectDB } from '@db/lib/mongodb'
import User from '@db/models/user'

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