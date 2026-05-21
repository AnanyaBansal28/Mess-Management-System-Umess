const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Meal", mealSchema);