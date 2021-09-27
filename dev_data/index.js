const LearningPath = require("../models/LearningPath")
const SessionContent = require("../models/SessionContent")
const SessionQuestion = require("../models/SessionQuestion")
const Session = require("../models/Sessions")
const User = require("../models/User")
const { learningPaths } = require("./learningPaths")
const { sessionContent } = require("./sessionContent")
const { sessionQuestions } = require("./sessionQuestions")
const { sessions } = require("./sessions")
const { users } = require("./users")


const insertUsers = async () => {
    await User.insertMany(users)
}


const insertLearningPaths = async () => {
    // await LearningPath.insertMany(learningPaths)
    for(let obj of learningPaths) {
        await LearningPath.create(obj)
    }
}

const insertSessions = async () => {
    // await Session.insertMany(sessions)
    for(let obj of sessions) {
        await Session.create(obj)
    }
}

const insertSessionQuestions = async () => {
    // await SessionQuestion.insertMany(sessionQuestions)
    for(let obj of sessionQuestions) {
        await SessionQuestion.create(obj)
    }
}

const insertSessionContent = async () => {
    // await SessionContent.insertMany(sessionContent)
    for(let obj of sessionContent) {
        await SessionContent.create(obj)
    }
}


exports.insertDevData = async function () {
    await insertUsers()
    await insertLearningPaths()
    await insertSessions()
    await insertSessionQuestions()
    await insertSessionContent()
}