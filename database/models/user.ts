import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    token: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    githubUsername : {type: String, required: true, unique: true},

    lastOnline: { type: Date, default: Date.now },  // auto set when created
    firstLoginDate: { type: Date, default: Date.now },
    repoBoost: { type: Number, default: 0 }          // counter starts at 0

  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

export default models.User || mongoose.model("User", UserSchema);
