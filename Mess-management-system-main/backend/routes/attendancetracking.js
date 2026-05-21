// attendancetracking.js

const express = require("express");

const router = express.Router();

const AttendanceTracking =
require("../models/AttendanceTracking");



// GET STUDENTS

router.get("/", async(req,res)=>{

try{

const data =
await AttendanceTracking.find();

res.json(data);

}catch(err){

res.status(500).json({
error:err.message
});

}

});




// MARK ATTENDANCE

router.post("/", async(req,res)=>{

try{

const {roll,meal} =
req.body;



const student =
await AttendanceTracking.findOne({roll});



if(student){

if(meal==="Breakfast")
student.breakfast=true;

if(meal==="Lunch")
student.lunch=true;

if(meal==="Dinner")
student.dinner=true;



await student.save();




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



}



res.json({

message:
"Attendance Saved"

});



}catch(err){

res.status(500).json({
error:err.message
});

}

});



module.exports = router;