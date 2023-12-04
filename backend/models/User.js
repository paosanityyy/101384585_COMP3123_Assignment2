const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: {
        type: String, 
        primaryKey: true,
        unique: true,
        required: true,
        maxLength: 100
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String, 
        required: true,
        maxLength: 50
    }
})

module.exports = mongoose.model('user', userSchema)