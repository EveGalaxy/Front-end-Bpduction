const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const router = express.Router();

// 🔹 Register User
router.post('/register', async (req, res) => {
    console.log("🔍 Register Request Body:", req.body); // ✅ Debug Data

    const {username, firstname, lastname,  password } = req.body;

    // ตรวจสอบว่าข้อมูลครบหรือไม่
    if (!username || !firstname || !lastname || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔍 Hashed Password:", hashedPassword); // ✅ Debug

    // บันทึกลงฐานข้อมูล
    db.query("INSERT INTO user (username, firstname, lastname, password) VALUES (?, ?, ?, ?)", 
    [username, firstname, lastname, hashedPassword], 
    (err, result) => {
        if (err) {
            console.error("❌ Database Insert Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "User registered successfully" });
    });
});


// 🔹 Login User
router.post('/login', async (req, res) => {
    console.log("🔍 Login Request Body:", req.body); // ✅ Debug

    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    db.query("SELECT * FROM user WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = results[0];

        if (!user.password) {
            return res.status(500).json({ error: "Password field is missing in database" });
        }

        console.log("🔍 User from DB:", user); // ✅ Debug

        const isMatch = await bcrypt.compare(password, user.password); // ตรวจสอบ error ตรงนี้

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // ตรวจสอบ JWT_SECRET
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET is missing in .env file" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("🔍 Generated Token:", token); // ✅ Debug JWT
        res.json({ message: "Login successful", token });
    });
});



module.exports = router;
