const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const { User } = require("./models");

const app = express();

app.use(express.json());

/**
 * Retrieves all users from the database and returns them as a JSON response.
 *
 * @route GET /users
 * @returns {User[]} An array of all users in the database
 */
app.get("/users", async (req, res) => {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
});

/**
 * Retrieves a single user from the database by its ID and returns it as a JSON response.
 *
 * @route GET /users/:id
 * @param {string} id - The ID of the user to retrieve.
 * @returns {User} The user with the specified ID.
 */
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
});

/**
 * Creates a new user in the database and returns the created user as a JSON response.
 *
 * @route POST /users
 * @param {Object} req.body - The user data to create a new user.
 * @returns {User} The created user.
 */
app.post("/users", async (req, res) => {
    const newUser = new User({ ...req.body });
    const insertedUser = await newUser.save();
    return res.status(201).json(insertedUser);
});

/**
 * Updates an existing user in the database by its ID and returns the updated user as a JSON response.
 *
 * @route PUT /users/:id
 * @param {string} id - The ID of the user to update.
 * @param {Object} req.body - The updated user data.
 * @returns {User} The updated user.
 */
app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    await User.updateOne({ id }, req.body);
    const updatedUser = await User.findById(id);
    return res.status(200).json(updatedUser);
});

/**
 * Deletes a user from the database by its ID and returns the deleted user as a JSON response.
 *
 * @route DELETE /users/:id
 * @param {string} id - The ID of the user to delete.
 * @returns {User} The deleted user.
 */
app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
});

/**
 * Starts the Express.js server and connects to the MongoDB database.
 *
 * This function is responsible for establishing the connection to the MongoDB database and starting the Express.js server on port 3000. It uses the `mongoose.connect()` method to connect to the database and the `app.listen()` method to start the server.
 *
 * If an error occurs during the connection or server startup, the function will log the error and exit the process with a non-zero exit code.
 */
const start = async () => {
    try {
        // await mongoose.connect(process.env.MANGODB_CONNECTION_URL);
        app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();