const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath =
path.join(
__dirname,
"../data/attendencetracking.json"
);


// GET

router.get("/", (req,res)=>{

const data =
JSON.parse(
fs.readFileSync(filePath,"utf-8")
);

res.json(data);

});


// POST

router.post("/", (req,res)=>{

const data =
JSON.parse(
fs.readFileSync(filePath,"utf-8")
);

const {roll,meal} =
req.body;

const student =
data.find(
s=>String(s.roll)===String(roll)
);

if(student){

if(meal==="Breakfast")
student.breakfast=true;

if(meal==="Lunch")
student.lunch=true;

if(meal==="Dinner")
student.dinner=true;

}

fs.writeFileSync(
filePath,
JSON.stringify(data,null,2)
);

res.json(data);

});


module.exports = router;