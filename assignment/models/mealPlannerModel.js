// set up model for the database

// import mongoose
const mongoose = require("mongoose")

// make a Schema for the database
const mealPlanSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true,
        unique: true
    },








})