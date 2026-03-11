const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const mealPath = path.join(__dirname, "../data/meal.json");

// GET bill
router.get("/", (req, res) => {

    const meals = JSON.parse(
        fs.readFileSync(mealPath)
    );

    let breakfast = 0;
    let lunch = 0;
    let dinner = 0;

    meals.forEach(m => {
        if (m.meal === "Breakfast") breakfast++;
        if (m.meal === "Lunch") lunch++;
        if (m.meal === "Dinner") dinner++;
    });

    const bill = {
        breakfast,
        lunch,
        dinner,
        total:
            breakfast * 25 +
            lunch * 45 +
            dinner * 40
    };

    res.json(bill);
});

module.exports = router;