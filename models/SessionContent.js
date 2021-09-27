const mongoose = require("mongoose")
const SessionQuestion = require("./SessionQuestion")
const Session = require("./Sessions")

const sessionContentSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "sessions"
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    next: new mongoose.Schema({
        type: {
            type: String,
            enum: ["content", "question"],
        },
        id: mongoose.Schema.Types.ObjectId
    }, {
        _id: false
    })
})

sessionContentSchema.set("timestamps", true)

sessionContentSchema.pre("save", function (next) {
    this.wasNew = this.isNew;
    next()
})


sessionContentSchema.post("save", async function (doc, next) {
    if(doc.wasNew){
        const session = await Session.findOne({_id: this.sessionId})
        if(!session.first) {
            const first = {
                type: "content",
                id: doc._id
            }
            const last = {
                type: "content",
                id: doc._id
            }
            
            await Session.updateOne({_id: session._id}, {last, first})
        }

        else {
            if(session.last.type === "content") {
                await SessionContent.findByIdAndUpdate(session.last.id, {next: {
                    type: "content",
                    id: doc._id
                }})
            }
            else {
                await SessionQuestion.findByIdAndUpdate(session.last.id, {next: {
                    type: "content",
                    id: doc._id
                }})
            }
            await Session.updateOne({_id: session._id}, {
                last: {
                    type: "content",
                    id: doc._id
                }
            })
        }
    }
    next()

})

const SessionContent = mongoose.model("session_content", sessionContentSchema)

module.exports = SessionContent