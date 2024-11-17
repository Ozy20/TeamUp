const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        teamName: {
            type: String,
            required: true,
            unique: true,
            minLength: 4,
            maxLength: 20
        },
        TeamLeader: {
            leaderID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
            LeaderName: { type: String, required: true }
        },
        members: [
            { memberID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" } }
        ],
        chat: {
            chatID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Chats" }
            ,lastMessage: {type: String, }
        },
        notifications: [{
            content: { type: String },
            date: { type: Date, default: Date.now }

        }]


    }
);
module.exports = mongoose.model("Teams", teamSchema);
