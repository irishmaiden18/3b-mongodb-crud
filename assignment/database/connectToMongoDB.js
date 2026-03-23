// import mongoose
const mongoose = require("mongoose")

// import .env
const dotevnv = require("dotenv")

// load your .env file
dotevnv.config()

// create a connection function that connects to our database
// everything that has to do with out database must be async/await
const connectToMongoDB = async () => {

    try {

        // connect to the database
        await mongoose.connect(process.env.MONGODB_URI)

        // log a message to show we have connected to the database
        console.log("Connected to the Database")
        
    } catch (error) {

        // log the error
        console.log(error.message)
        
    }
}

// export the function connecting to our database
module.exports = connectToMongoDB