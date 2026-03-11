const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/attendance.json");

// GET attendance
router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync(filePath);
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;