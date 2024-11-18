const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    messages: [
      {
        messageId: {
          type: String,
          required: true,
          unique: true,
        },
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        content: {
          type: String,
          required: function () {
            return !this.img && !this.file;
          },
          trim: true,
          maxlength: 1000,
        },
        date: {
          type: Date,
          default: Date.now,
          min: "1900-01-01",
          max: () => Date.now(),
          validate: {
            validator: (v) => v instanceof Date && !isNaN(v),
            message: "Invalid date.",
          },
        },
        img: {
          data: Buffer,
          contentType: {
            type: String,
            enum: ["image/jpeg", "image/png", "image/gif"], 
          },
          required: function () {
            return !this.content && !this.file; 
          },
        },
        file: {
          data: Buffer,
          contentType: {
            type: String,
            enum: [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "text/plain",
            ], // Allowed file formats
          },
          required: function () {
            return !this.content && !this.img; 
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
chatSchema.path("messages").validate(function (messages) {
  return messages && messages.length > 0;
}, "A chat must contain at least one message.");
module.exports = mongoose.model("Chat", chatSchema);
