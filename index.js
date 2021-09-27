const mongoose = require("mongoose")
// const { insertDevData } = require("./dev_data")

mongoose.connect("mongodb://localhost/learning-paths")
.then(() => {
    console.log("Database connected!")
    // return insertDevData()
})
.then(() => {
    console.log("Dev Data Inserted!")
})
.catch(err => {
    console.log(err)
})