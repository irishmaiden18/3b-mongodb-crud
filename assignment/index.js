// npm init -y
// npm i morgan express dotenv mongoose

// import express and morgan
const express = require("express")
const logger = require("morgan")

// set up the express app
const app = express()

// import the database connection function
const connectToMongoDB = require("./database/connectToMongoDB")

// set up middleware

// format our express body
app.use(express.json())

// set up morgan
app.use(logger("dev"))

// import the router file
const mealPlannerRouter = require("./routes/mealPlannerRouter")

// set up the URL routes to connect to the router
app.use("/api/v1/mealPlanner", mealPlannerRouter)

// set up port
const PORT = 3000

// begin listening
app.listen(PORT, () => {

    console.log(`Server is now listening on Port: ${PORT}`)

    // establish the database connection when the server runs using the database connection function we imported
    connectToMongoDB()

})
