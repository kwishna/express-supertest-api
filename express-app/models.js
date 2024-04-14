const mongoose = require("mongoose");

/**
 * Defines the schema for a User document in the MongoDB database.
 * 
 * The schema includes the following fields:
 * - `name`: The name of the user, required.
 * - `job`: The occupation of the user, required.
 * - `age`: The age of the user, required.
 * - `isMarried`: Whether the user is married, optional with a default value of `true`.
 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    isMarried: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };