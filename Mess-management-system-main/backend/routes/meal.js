const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/meal.json");


// GET meal
router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync(filePath);
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// POST meal
router.post("/", (req, res) => {
    try {

        const { meal } = req.body;

        const data = JSON.parse(
            fs.readFileSync(filePath)
        );

        const newMeal = {
            id: Date.now(),
            meal: meal
        };

        data.push(newMeal);

        fs.writeFileSync(
            filePath,
            JSON.stringify(data, null, 2)
        );

        res.json(newMeal);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;