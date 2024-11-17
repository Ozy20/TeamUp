const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema(
  {
    communityName: { type: String, required: true },
    teams: [
      {
        teamId: { type: mongoose.Schema.Types.ObjectId, required: true ,ref: "teams"},
        teamName: { type: String},
      },
    ],
    members: {
      memberId: { type: Object, required: true,ref: "users" },
    
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "posts",
    },
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
module.exports = mongoose.model("Comunity", communitySchema);
