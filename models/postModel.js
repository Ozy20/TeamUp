const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    publisherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    content: { type: String, required: true, minlength: 1, maxlength: 1000 },
    date: {
      type: Date,
      default: Date.now,
      min: "1900-01-01",
      max: () => Date.now(),
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
      validate: {
        validator: function (value) {
          return value && value.length < 5 * 1024 * 1024;
        },
        message: "Image size exceeds the maximum limit of 5MB",
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
      validate: {
        validator: function (value) {
          return value && value.length < 10 * 1024 * 1024;
        },
        message: "File size exceeds the maximum limit of 10MB",
      },
    },
    comments: [
      {
        date: { type: Date, default: Date.now },
        comment: {
          type: String,
          required: true,
          validate: {
            validator: function (value) {
              return value.trim().length > 0;
            },
            message: "Comment cannot be empty or whitespace",
          },
        },
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
