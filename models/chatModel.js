const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    messages: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId, required: true,
          ref: "userModel"
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
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Chats", chatSchema);
