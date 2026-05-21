const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
name:String,
rating:Number,
comment:String,
date:String,
status:{
type:String,
default:"NEW"
},
response:{
type:String,
default:""
}
});

module.exports = mongoose.model(
"Feedback",
feedbackSchema
);