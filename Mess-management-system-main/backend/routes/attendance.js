const express = require("express");

const router = express.Router();

const Attendance = require("../models/Attendance");



// GET ATTENDANCE

router.get("/", async (req, res) => {

  try {

    const data =
    await Attendance.find();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



// ADD ATTENDANCE

router.post("/", async (req, res) => {

  try {

    const { date, status } =
    req.body;



    const newAttendance =
    new Attendance({

      date,
      status

    });



    await newAttendance.save();




    // SOCKET.IO

    const io =
    req.app.get("io");



    io.emit(

      "attendanceUpdated",

      {
        message:
        "Attendance Updated"
      }

    );



    res.json({

      message:
      "Attendance added"

    });

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

});



module.exports = router;