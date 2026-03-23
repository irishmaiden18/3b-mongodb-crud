// set up model for the database

// import mongoose
const mongoose = require("mongoose")

// make a Schema for the database
const mealPlannerSchema = new mongoose.Schema ({

        date: {
            type: String,
            required: true,
            unique: true
        },
        breakfast: {
            type: String,
            required: true
        },
        snacks: {
            type: String,
            default: "" // if property is not included when adding data to DB, use default value
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        },
        dessert: {
            type: String,
            default: "" // if property is not included when adding data to DB, use default value
        }
    },
    {
        timestamps: true // set up timestamps for when data was created and last updated
    }
)

// set up the model -- this is the ONLY way to interact with the MongoDB database
const MealPlanner = mongoose.model("MealPlanner", mealPlannerSchema)

// export the model so we can use it elsewhere
module.exports = MealPlanner