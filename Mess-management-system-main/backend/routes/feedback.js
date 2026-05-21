const express = require("express");

const router = express.Router();

const Feedback = require("../models/Feedback");


// GET all feedback
router.get("/", async (req,res)=>{
try{

const data =
await Feedback.find();

res.json(data);

}catch(err){
res.status(500).json({
error:err.message
});
}
});


// POST new feedback OR update
router.post("/", async (req,res)=>{
try{

// NEW feedback from student
if(req.body.comment){

const newFeedback =
new Feedback({
name:req.body.name || "Student",
rating:req.body.rating,
comment:req.body.comment,
date:new Date().toLocaleDateString(),
status:"NEW"
});

await newFeedback.save();

return res.json(newFeedback);
}


// Admin update feedback
const {id,status,response} =
req.body;

const updated =
await Feedback.findByIdAndUpdate(
id,
{
status,
response
},
{new:true}
);

res.json(updated);

}catch(err){
res.status(500).json({
error:err.message
});
}
});

module.exports = router;