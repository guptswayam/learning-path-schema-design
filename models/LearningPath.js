const mongoose = require("mongoose")

const learningPathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    // sessions: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "sessions",
    //     default: null,
    //     required: true
    // },

    description: {
        type: String,
        required: true
    },

    serialNumber: {
        type: Number,
        unique: true,
    }
})

learningPathSchema.set("timestamps", true)

learningPathSchema.pre("save", async function (next) {
    if(this.isNew){
        let serialNumber;
        const lastLearningPath = await LearningPath.find().sort("-serialNumber").limit(1);
        serialNumber = lastLearningPath.length === 1 ? lastLearningPath[0].serialNumber + 1 : 1
        this.serialNumber = serialNumber
    }
    next()

})

const LearningPath = mongoose.model("learning_paths", learningPathSchema)

module.exports = LearningPath