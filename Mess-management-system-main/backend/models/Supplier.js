const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  rating: Number,
  supplies: [String]
});

module.exports = mongoose.model(
  "Supplier",
  supplierSchema
);