    const mongoose = require("mongoose");

    var employeeSchema = new mongoose.Schema({
        first_name: {
            type: String, 
            required: true,
            maxLength: 100
        },
        last_name: {
            type: String,
            required: true,
            maxLength: 50
        },
        email: {
            type: String, 
            unique: true,
            maxLength: 50
        }
    })

    module.exports = mongoose.model('employee', employeeSchema)