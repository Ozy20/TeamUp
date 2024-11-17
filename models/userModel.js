const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const config = require("config")

mongoose.connect("mongodb://127.0.0.1:27017/uni").then(
    () => {
        console.log("connected to the users database");
    }
).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15

    }
    , email: {//primary key
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    }
    ,
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    userRole: {
        type: Number, // 1-> admin , 2->prof , 3->student
        required: true
    },
    img: {
        type: Buffer,

    },
    links: {
        type: [String],
    }
    ,
    skills: {
        type: [String],

    },
    teams: [{
        teamID: { type: mongoose.Schema.Types.ObjectId },
        teamName: { type: String }
    }],
    chats: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Chats"
    },
    communities: [{
        commID: { type: mongoose.Schema.Types.ObjectId },
        commName: { type: String }
    }],
    notifications: [{
        content: { type: String },
        date: { type: Date }

    }],
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Posts"
    }
});

userSchema.method("genAuthToken", function () {
    const token = jwt.sign({ userid: this._id, userRole: this.userRole }, config.get("jwtsec"))
    return token;
}
)
const user = mongoose.model("users", userSchema);

module.exports = user