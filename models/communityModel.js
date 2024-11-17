const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema(
  {
    communityName: { type: String, required: true },
    teams: [
      {
        teamId: { type: mongoose.Schema.Types.ObjectId, required: true ,ref: "teamModel"},
        teamName: { type: String},
      },
    ],
    members: {
      userId: { type: Object, required: true,ref: "userModel" },
    
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "postModel",
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comunities", communitySchema);
