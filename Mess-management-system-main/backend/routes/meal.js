const express = require("express");

const router = express.Router();

const Meal = require("../models/Meal");

const Attendance =
require("../models/Attendance");




// GET meal

router.get("/", async (req, res) => {

  try {

    const data =
    await Meal.find();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});




// POST meal

router.post("/", async (req, res) => {

  try {

    const { meal } =
    req.body;





    // SAVE MEAL

    const newMeal =
    new Meal({

      meal: meal

    });

    await newMeal.save();





    // ATTENDANCE LOGIC

    const today =

    new Date()
    .toISOString()
    .split("T")[0];



    const exists =

    await Attendance.findOne({

      date: today

    });




    if (!exists) {

      const newAttendance =
      new Attendance({

        date: today,

        status: "Present"

      });

      await newAttendance.save();

    }





    // SOCKET.IO

    const io =
    req.app.get("io");



    io.emit(

      "billUpdated",

      {

        message:
        "Bill Updated"

      }

    );





    res.json(newMeal);




  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



module.exports = router;