const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/feedback.json");


// GET feedback
router.get("/", (req, res) => {

    const data = JSON.parse(
        fs.readFileSync(filePath)
    );

    res.json(data);
});


// POST feedback
router.post("/", (req, res) => {

    const { rating, comment } = req.body;

    const data = JSON.parse(
        fs.readFileSync(filePath)
    );

    const newFeedback = {
        rating,
        comment,
        date: new Date().toLocaleDateString()
    };

    data.unshift(newFeedback);

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 2)
    );

    res.json(newFeedback);
});

module.exports = router;