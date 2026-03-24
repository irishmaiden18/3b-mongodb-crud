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
        let mealPlans = await MealPlanner.find()

        // account for queries inconsistent with available queries
        // create an array of valid options
        const validOptions =["breakfast", "snacks", "lunch", "dinner", "dessert"]

        // if there is a meal query
        if (req.query.meal) {

            // if our validOptions array doesn't include the query.toLowerCase()
            if (!validOptions.includes(req.query.meal.toLowerCase())) {

                // throw an error
                throw new Error("Meal type not found!")

            }

            // mealPlans is an array of all the query parameter meals in the database without the id
            mealPlans = await MealPlanner.find().select(`${req.query.meal} -_id`)

        }

        //alternative method: 

        // if (req.query.meal) {
            
        //     // if the query parameter is "breakfast"
        //     if (req.query.meal.toLowerCase() === "breakfast") {

        //         // mealPlans is an array of all the breakfasts in the database, without the id
        //         mealPlans = await MealPlanner.find().select("breakfast -_id")

        //     // else if the query parameter is "snacks"
        //     } else if (req.query.meal.toLowerCase() === "snacks") {

        //         // mealPlans is an array of all the snacks in the database, without the id
        //         mealPlans = await MealPlanner.find().select("snacks -_id")
                
        //     // else if the query parameter is "lunch"
        //     } else if (req.query.meal.toLowerCase() === "lunch") {

        //         // mealPlans is an array of all the lunches in the database, without the id
        //         mealPlans = await MealPlanner.find().select("lunch -_id")

        //     // else if the query parameter is "dinner"
        //     } else if (req.query.meal.toLowerCase() === "dinner") {

        //         // mealPlans is an array of all the dinners in the database, without the id
        //         mealPlans = await MealPlanner.find().select("dinner -_id")

        //     // else if the query parameter is "dessert"
        //     } else if (req.query.meal.toLowerCase() === "dessert") {

        //         // mealPlans is an array of all the desserts in the database, without the id
        //         mealPlans = await MealPlanner.find().select("dessert -_id")
            
        //     } 

        // send a response to the user with the appropriate mealPlans from the database
        res.json ({
            message: "success",
            payload: mealPlans
        })
        
    } catch (error) {
        
        // send an error response to the user with an error message
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }

})

// handle GET requests for a particular date
// anything to do with our database must be async/await
router.get("/:date", async (req, res) => {

    try {

        // return the meal plan that has the date from the URL, the dynamic parameter
        const mealPlan = await MealPlanner.findOne({ date: req.params.date})

        // prevent a false positive if we don't find a meal plan
        if (!mealPlan) {
            throw new Error("Meal plan NOT found!")
        }

        // send a response with the meal plan from the querried date
        res.json ({
            message: "success",
            payload: mealPlan
        })
        
    } catch (error) {

        // send a failure message with the error message
        res.status(500).json ({
            message: "failure",
            payload: error.message
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

// handle the PUT requests searching by ID
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
            throw new Error("Meal plan NOT found!")
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

// handle PUT requests searching by date
// everything that has to do with our database must be async/await
router.put("/date/:date", async (req, res) => {

    try {

        // model.findOneAndUpdate({property to search by}, newData, {new: true}) -- 
        // property to search by -- date of the item we are trying to update
        // newData -- incoming data we want to overwrite the old object with (ALWAYS req.body)
        // new: true -- a flag telling the computer to return the updated version of the data data rather than the old data. without this, the data will still update BUT the computer will return the original unupdated data
        const foundMealPlan = await MealPlanner.findOneAndUpdate({date: req.params.date}, req.body, {new: true})

        // prevent a false positive if we don't find a meal plan
        if (!foundMealPlan) {

            throw new Error("Meal plan to update NOT found!")

        } else {

            // send a response to the user with the updated meal plan
            res.json ({
                message: "success",
                messageDetail: "Meal plan successfully updated!",
                payload: foundMealPlan
            })

        }
        
    } catch (error) {

        // send a failure response to the user with the error message
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