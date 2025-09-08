import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
    throw new Error("MONGODB URI missing")
}

let cached = (global as any).mongoose || {corn: null, promise: null};

export async function connectDB() {
    if(cached.corn) return cached.corn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false
        }).then((mongoose) => mongoose);
    }

    cached.corn = await cached.promise;

    return cached.corn;
}