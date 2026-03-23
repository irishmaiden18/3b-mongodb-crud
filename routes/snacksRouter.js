/*
    6a. Set up basic request handler settings
*/
const express = require("express")
const router = express.Router()

// import our snack model
const Snack = require("../models/snackModel")

/*
    9. Write a request handler function for GET requests to localhost:3000/api/snacks
*/
router.get("/", async (req, res) => {

    try {

        // return all snacks back from database with .find()
        // anything with the database is await
        const snacks = await Snack.find()

        // send response to the user with snacks from the database
        res.json ({
            message: "success",
            payload: snacks
        })
        
    } catch (error) {

        // send an error response to the user with an error message
        res.status(500).json ({
            message: "failure",
            payload: "Error fetching snacks from database"
        })
    }

})
/*
    8. Write a request handler function for POST reqeuests to localhost:3000/api/snacks
*/
// remember, everything with our model is asynchronous
router.post("/", async (req, res) => {
    try {
        // create a new snack in our database
        // model.create(object) -- creates a database entry based on the object data we pass in
        // for dynamic data from a POST request, that objec will be the request.body
        // working with the database takes time, so we await the create function
        const newSnack = await Snack.create(req.body)

        // send a response back to the user with the newSnack we created
        res.json ({
            messsage: "success",
            payload: newSnack
        })

    } catch (error) {

        // send a generic error message
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

/*
    10. Write a request handler function for PUT reqeuests to localhost:3000/api/snacks
*/
router.put("/:id", async (req, res) => {

    try {

        // model.findByIdAndUpdate(id, newData, {new: true}) -- 
        // id -- id of the item we are trying to update
        // newData -- incoming data we want to overwrite the old object with
        // new: true -- a flag telling the computer to return the updated version of the data data rather than the old data. without this, the data will still update BUT the computer will return the original unupdated data
        // everything to do with the database must be awaited 

        // id: req.params.id (ALWAYS)
        // newData: req.body (ALWAYS)
        const updatedSnack = await Snack.findByIdAndUpdate(req.params.id, req.body, {new: true})

        // prevent false positive if we pass in a valid Object ID
        // without this, code will only fail if we pass in an invalid object id.  
        // Including this makes it so if we pass in a valid ObjectId and don't find the ID, we'll still return a failure message
        if(!updatedSnack){
            throw new Error("Snack not found");
        }

        // send a response to the user with the updated data
        res.json ({
            message: "success",
            payload: updatedSnack
        })
        
    } catch (error) {

        // send an error response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
        
    }
})

/*
    11. Write a request handler function to DELETE reqeuests to localhost:3000/api/snacks
*/
router.delete("/:id", async (req, res) => {

    try {
        
        // .findByIdAndDelete(id) -- deletes the item by that id
        const snackToDelete = await Snack.findByIdAndDelete(req.params.id)

        // prevent false positive if we pass in a valid Object ID
        // without this, code will only fail if we pass in an invalid object id.  
        // Including this makes it so if we pass in a valid ObjectId and don't find the ID, we'll still return a failure message
        if (!snackToDelete) {
            throw new Error("Snack to delete NOT found!")
        }

        // send a response to the user with a message saying the item has been deleted
        res.json ({
            message: "success",
            payload: "Snack successfully deleted"
        })

    } catch (error) {
        console.log(error)
        // send a failure response to the user with the error details
        // 404 because the only thing that can go wrong is an id not being found
        res.status(404).json ({
            message: "failure",
            payload: error.message
        })
    }
})

/*
    6b. Export the router
*/
module.exports = router