const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/users.json");


// GET users
router.get("/", (req, res) => {

    const data = JSON.parse(
        fs.readFileSync(filePath)
    );

    res.json(data);
});


// POST user
router.post("/", (req, res) => {

    const data = JSON.parse(
        fs.readFileSync(filePath)
    );

    const newUser = req.body;

    data.push(newUser);

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 2)
    );

    res.json(newUser);
});

module.exports = router;