import mongoose, { Schema, models } from "mongoose";

const ReportSchema = new Schema(
  {
    user: {type: String, required: true},
    feedback : {type: String, required: true}
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

export default models.Report || mongoose.model("Report", ReportSchema);
