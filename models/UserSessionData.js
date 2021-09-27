const mongoose = require("mongoose")

const userSessionDataSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "sessions"
    },
    answer: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "session_questions"
    }
})

userSessionDataSchema.set("timestamps", true)

const UserSessionData = mongoose.model("user_session_data", userSessionDataSchema)

module.exports = UserSessionData