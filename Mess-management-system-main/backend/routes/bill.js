const express = require("express");

const router = express.Router();

const Meal = require("../models/Meal");


// GET bill
router.get("/", async (req, res) => {
    try {
        const meals = await Meal.find();

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

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;