const mongoose = require("mongoose");



const menuSchema = new mongoose.Schema({

  type: String,

  name: String,

  price: Number,

  category: String,

  image: String

});



module.exports =
mongoose.model(
"Menu",
menuSchema
);