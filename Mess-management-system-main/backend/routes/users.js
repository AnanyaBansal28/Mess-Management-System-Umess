const bcrypt = require("bcryptjs");
const express = require("express");

const router = express.Router();

const User = require("../models/User");


// GET users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


// POST signup
router.post("/", async (req, res) => {

  try {

    const data = req.body;

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    data.password = await bcrypt.hash(
      data.password,
      salt
    );

    const newUser = new User(data);

    await newUser.save();

    res.json({
      message: "User registered successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;