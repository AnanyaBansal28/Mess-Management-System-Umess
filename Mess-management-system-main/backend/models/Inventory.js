const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
  price: Number
});

module.exports = mongoose.model(
  "Inventory",
  inventorySchema,
  "inventory"
);