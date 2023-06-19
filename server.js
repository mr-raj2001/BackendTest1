const express = require('express');
const mongoose = require('mongoose');
const ToDo = require('./models/todo');

const app = express();
const PORT = 3000;

// Database connection
mongoose.connect("mongodb+srv://Raj_2001:Raj2001@cluster0.pxptwj2.mongodb.net/");
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", () => {
  console.log("Error connecting to database");
});

// Middleware
app.use(express.json());

// Create a ToDo Item
app.post('/api/todo', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.send("Please add a title and description");
    }
    const todo = new ToDo({
      title,
      description,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.log("Error saving todo", err);
  }
});

// Get All ToDo Items
app.get('/api/todo', async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.log("Error getting todos", err);
  }
});

// Get Single ToDo Item
app.get('/api/todo/:id', async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) {
        res.send("Todo not found");
    }
    res.status(200).json(todo);
  } catch (err) {
    console.log("Cannot find item", err);
  }
});

// Update a ToDo Item
app.put('/api/todo/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTodo = await ToDo.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTodo) {
        res.send("Didnt find");
    }
    res.status(200).json(updatedTodo);
  } catch (err) {
   console.log("cannot update item",err);
  }
});

// Delete a ToDo Item
app.delete('/api/todo/:id', async (req, res) => {
  try {
    const deletedTodo = await ToDo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      res.send("ToDo item not found");
    }
    res.send("Deleted todo item");
  } catch (err) {
    console.log("Cannot delete item", err);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
