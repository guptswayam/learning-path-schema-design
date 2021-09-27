const mongoose = require("mongoose")

const userSessionSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "sessions"
    }
    
})

userSessionSchema.set("timestamps", true)

const UserSession = mongoose.model("user_sessions", userSessionSchema)

module.exports = UserSession