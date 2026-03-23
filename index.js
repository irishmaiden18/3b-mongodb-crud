// npm i -- when you already have the package.json with the dependencies listed rather than npm all the individual stuff it will install all the dependencies

/*
    0. Starter code - Modules
*/
const express = require("express");
const app = express();
const logger = require("morgan");

/*
    3. Import the database connection function.
*/
const connectToMongoDB = require("./database/mongodb")


/*
    0. Starter code - Middleware
*/
app.use(express.json());
app.use(logger("dev"));

/*
    7. Import and connect the router
*/
const snacksRouter = require("./routes/snacksRouter")
app.use("/api/v1/snacks", snacksRouter)

/*
    0. Starter code - Server start
*/
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is on port ${PORT}...`);
    /*
        4. Establish the database connection when the server runs
    */
   connectToMongoDB()


});