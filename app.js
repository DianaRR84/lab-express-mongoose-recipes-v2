const express = require("express");
const logger = require("morgan");

const app = express();
app.use(express.json()); // Allows us to read JSON data in requests

const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    // Create a new recipe using the data from req.body
    Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    })
      .then((createdRecipe) => {
        // Respond with the newly created recipe and a 201 status code
        res.status(201).json(createdRecipe);
      })
      .catch((err) => {
        res.status(500).json({ message: "Error while creating a new recipe" });
      });
  });


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    // Get all recipes from the database
    Recipe.find()
      .then((allRecipes) => {
        // Respond with the recipe data and a 200 status code
        res.status(200).json(allRecipes);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error while getting all recipes" });
      });
  });
  


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    // Get the recipe from the database using the query param `id` from the URL
    Recipe.findById(req.params.id)
      .then((recipe) => {
        // Respond with the recipe data and a 200 status code
        res.status(200).json(recipe);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error while getting a single recipe" });
      });
  });
  


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    // Find the recipe by ID and update it with the new data from req.body
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedRecipe) => {
        // Respond with the updated recipe and a 200 status code
        res.status(200).json(updatedRecipe);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error while updating the recipe" });
      });
  });
  


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    // Find the recipe by ID and delete it from the database
    Recipe.findByIdAndDelete(req.params.id)
      .then(() => {
        // Respond with a 204 status code (No Content) after successful deletion
        res.status(204).send();
      })
      .catch((error) => {
        res.status(500).json({ message: "Error while deleting the recipe" });
      });
  });
  



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
