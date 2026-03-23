/*
    1. Set up a connection to MongoDB using mongoose:
*/
// 1a. Import mongoose, setup .env use
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// function that loads our environment variables
// loads everything from your .env file
dotenv.config()

// 1b. Create a connection function that connects to our database
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")

    } catch (error) {
        console.log(error)
    }
}

// 1c. Export the function
module.exports  = connectToMongoDB
