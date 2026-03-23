// import express
const express = require("express")

// set up the router
const router = express.Router()

// import our MealPlanner model
const MealPlanner = require("../models/mealPlannerModel")

// handle GET requests
// anthing to do with our database must be asyc/await
router.get("/", async (req, res) => {

    try {

        // return all meal plans back from the database with .find()
        const mealPlans = await MealPlanner.find()

        // send a response to the user with meal plans from the database
        res.json ({
            message: "success",
            payload: mealPlans
        })
        
    } catch (error) {
        
        // send an error response to the user with an error message
        res.status(500).json ({
            message: "failure",
            payload: "Error fetching Meal Plans from the database"
        })
    }

})

// handle POST requests
// everything that has to do with our database must be async/await
router.post("/", async (req, res) => {

    try {

        // create a new meal plan in our database
        // mdoel.create(object) -- creates a database entry based on the object data we pass in
        // for data from a POST request that object will always be the request.body
        const newMealPlan = await MealPlanner.create(req.body)

        // send a response back to the user with the newMealPlan we created
        res.json ({
            message: "success",
            payload: newMealPlan
        })
        
    } catch (error) {

        // send a generic error message to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
        
    }
})

// handle the PUT requests
// everything that has to do with our database must be async/await
router.put("/:id", async (req, res) => {

    try {

        // model.findByIdAndUpdate(id, newData, {new: true}) -- 
        // id -- id of the item we are trying to update (ALWAYS req.params.id)
        // newData -- incoming data we want to overwrite the old object with (ALWAYS req.body)
        // new: true -- a flag telling the computer to return the updated version of the data data rather than the old data. without this, the data will still update BUT the computer will return the original unupdated data
        const updatedMealPlan = await MealPlanner.findByIdAndUpdate(req.params.id, req.body, {new: true})

        // prevent a false positive if we pass in a valid Object ID
        // without this, code will only fail if we pass in an invalid object id.
        // including this makes it so if we pass in a valid objectId and don't find the ID, we'll still return a failure message
        if (!updatedMealPlan) {
            throw new Error("Meal Plan NOT found!")
        }

        // send a positive response to the user with the updated data if we dont hit the error above
        res.json ({
            message: "success",
            payload: updatedMealPlan
        })
        
    } catch (error) {

        // send an error response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
        
    }
})

// handle DELETE requests
// everything that has to do with our database must be async/await
router.delete("/:id", async (req, res) => {

    try {

        // .findByIdAndDelete(id) -- deletes the item by that id
        const mealPlanToDelete = await MealPlanner.findByIdAndDelete(req.params.id)

        // prevent a false positive if we pass in a valid Object ID
        // without this, code will only fail if we pass in an INVALID object id.
        // including this makes it so that if we pass in a valid object id and don't find the ID, we'll still return a failure message
        if (!mealPlanToDelete) {
            throw new Error("Meal plan to delete NOT found!")
        }
        
        // if we get past the error check above, sent a success message to the user saying the item has been deleted
        res.json({
            message: "success",
            payload: "Meal plan has been successfully deleted!"
        })
        
    } catch (error) {

        // sent a failure response to the user with the error details
        // use a 404 error code here because the only thing that can go wrong is and id not being found
        res.status(404).json ({
            message: "failure",
            payload: error.message
        })
        
    }
})

// export the router
module.exports = router