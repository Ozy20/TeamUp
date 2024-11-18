const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema(
  {
    communityName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    teams: [
      {
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "teams",
        },
        teamName: { type: String },
      },
    ],
    members: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        leaderID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Community", communitySchema);
