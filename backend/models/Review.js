const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    filename: { type: String, required: false },
    language: { type: String, required: false },
    code: { type: String, required: true },
    llmResponse: { type: String, required: false },
    summary: { type: String, required: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
