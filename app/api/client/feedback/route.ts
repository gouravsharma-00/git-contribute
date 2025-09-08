import { NextResponse } from "next/server";
import { connectDB } from "@db/lib/mongodb";
import Report from '@db/models/report'

export async function POST(req: Request) {
    const {email, feedback} = await req.json()

    let user: string;
    if(!email) {
        user = "Anonomos"
    }else {
        user = email
    }
    if(!feedback) {
        return NextResponse.json({
            message: 'fill the form first',
            error: 'feedback missing'
        }, {status: 400})
    }

    try {
        await connectDB();

        // @ts-ignore
        const report = await Report.create({
            user: user, 
            feedback: feedback
        })


        return NextResponse.json({
            message: "Feedback done",
            report: report,
            error: null
        }, {status: 200})

    }catch(err) {
        return NextResponse.json({
            message: "some error",
            error: err instanceof Error ? err.message : "some error"
        }, {status: 500})
    }
}