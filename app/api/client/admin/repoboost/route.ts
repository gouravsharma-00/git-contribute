import { NextResponse } from 'next/server'
import { connectDB } from '@db/lib/mongodb'
import User from '@db/models/user'

export async function POST(req: Request) {
    const { email }: { email: string } = await req.json()

    if (!email) {
        return NextResponse.json(
            { message: 'Error', error: 'missing keys' },
            { status: 400 }
        )
    }

    try {
        await connectDB()

        // Find and update user in one step
        //@ts-ignore
        const user = await User.findOneAndUpdate(
            { email }, // filter
            { $inc: { repoBoost: 1 } }, // increment repoboost by 1
            { new: true } // return the updated document
        )

        if (!user) {
            return NextResponse.json(
                { message: 'User does not exist', error: null },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Repoboost incremented', user, error: null },
            { status: 200 }
        )
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { message: 'Error', error: 'Mongo error' },
            { status: 500 }
        )
    }
}
