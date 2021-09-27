const mongoose = require("mongoose")

const firstLastSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["content", "question"],
    },
    id: mongoose.Schema.Types.ObjectId
}, {
    _id: false
})

const sessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    learningPathId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "learning_paths"
    },

    priority: {
        type: Number
    },

    first: firstLastSchema,

    last: firstLastSchema

})

sessionSchema.set("timestamps", true)

sessionSchema.pre("save", async function (next) {
    if(this.isNew){
        let priority;
        const lastLearningPath = await Session.find({learningPathId: this.learningPathId}).sort("-priority").limit(1);
        priority = lastLearningPath.length === 1 ? lastLearningPath[0].priority + 1 : 1
        this.priority = priority
    }
    next()
})

const Session = mongoose.model("sessions", sessionSchema)

module.exports = Session