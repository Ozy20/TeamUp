const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    publisherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    content: { type: String, required: true },
    date: {
      type: Date,
      default: Date.now,
      min: "1900-01-01",
      max: () => Date.now(),
    },
    img: { type: Buffer },
    file: { type: Buffer },
    comments: [
      {
        date: { type: Date, default: Date.now },
        comment: { type: String },
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
      },
    ],
    commId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "communities",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", postSchema);
