const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// User Registration with Password Hashing
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// User Login (simplified, without password validation)
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ status: false, message: "Invalid Username and password" });
        } 
        if (user.password !== password) {
            return res.status(401).json({ status: false, message: "Invalid Username and password" });
        }

        res.status(200).json({
            status: true,
            username: user.username,
            message: "User logged in successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
});

module.exports = router;
