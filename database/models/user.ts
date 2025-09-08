import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        token : {type: String, required: true},
        image: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export default models.User || mongoose.model('User', UserSchema);