# Assignment 3B. Meal Planner

---

## Goals

-DONE-- Create an API that is connected to a database on Mongo DB
-DONE-- Allow users to `C`reate, `R`ead, `U`pdate, and `D`elete data that exists on the server

---

![Meal Planner](https://i.imgur.com/3ru0Ld1.jpg)

You are tasked with creating a Meal Planner API! The purpose is to plan your meals for a certain day ahead of time, and maybe add/edit/delete meals based on how the day actually went.

Your database only needs one collection, to store the plan for a day. When it comes to the schema, these are the most important things to track:

- Date
- Breakfast Meal
- Lunch Meal
- Dinner Meal

Things such as Snacks or Dessert are optional.

Your API should be able to perform the following actions:

-DONE-- `C`reate a plan for a new date
-DONE-- `R`ead the meal plans for every date
-DONE-- `U`pdate meals after eating them (select the documents by ID)
-DONE-- `D`elete a plan

Stretch goals:

**You will have to do some research for some of the below.**

-DONE-- `R`ead the plan for a specific date.
-DONE-- `U`pdate but select the documents by Date instead
- `R`ead all meals of a certain type. For example, only reading `Breakfast` meals. (Hint: https://mongoosejs.com/docs/api/query.html#Query.prototype.select() )
