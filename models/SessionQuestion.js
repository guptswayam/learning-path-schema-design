const mongoose = require("mongoose")
const SessionContent = require("./SessionContent")
const Session = require("./Sessions")

const sessionQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    options: {
        type: [String],
        default: null
    },
    
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "sessions"
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

sessionQuestionSchema.set("timestamps", true)

sessionQuestionSchema.pre("save", function (next) {
    this.wasNew = this.isNew;
    next()
})

sessionQuestionSchema.post("save", async function (doc, next) {
    if(doc.wasNew){
        const session = await Session.findOne({_id: this.sessionId})
        if(!session.first) {
            const first = {
                type: "question",
                id: doc._id
            }
            const last = {
                type: "question",
                id: doc._id
            }

            await Session.updateOne({_id: session._id}, {last, first})
        }

        else {
            if(session.last.type === "content") {
                await SessionContent.findByIdAndUpdate(session.last.id, {next: {
                    type: "question",
                    id: doc._id
                }})
            }
            else {
                await SessionQuestion.findByIdAndUpdate(session.last.id, {next: {
                    type: "question",
                    id: doc._id
                }})
            }
            await Session.updateOne({_id: session._id}, {
                last: {
                    type: "question",
                    id: doc._id
                }
            })
        }
    }
    next()

})

const SessionQuestion = mongoose.model("session_questions", sessionQuestionSchema)

module.exports = SessionQuestion