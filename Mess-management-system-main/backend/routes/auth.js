const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();



// ADMIN SIGNUP

router.post("/admin-signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.json({
        message: "User already exists"
      });

    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // SAVE USER
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    await newUser.save();

    res.json({
      message: "Admin registered successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



// ADMIN LOGIN

router.post("/admin-login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND ADMIN
    const admin =
      await User.findOne({
        email,
        role: "admin"
      });

    if (!admin) {

      return res.json({
        message: "Invalid credentials"
      });

    }

    // COMPARE PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {

      return res.json({
        message: "Invalid credentials"
      });

    }

    // JWT TOKEN
    const token = jwt.sign(

      {
        id: admin._id,
        role: admin.role
      },

      "jwtSecretKey",

      {
        expiresIn: "1h"
      }

    );

    // SAVE COOKIE
    res.cookie("token", token);

    // SAVE SESSION
    req.session.user = {
      id: admin._id,
      role: admin.role
    };

    res.json({
      message: "success",
      token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



// STUDENT SIGNUP

router.post("/student-signup", async (req, res) => {

  try {

    const { studentID, password } = req.body;

    const existingStudent =
      await User.findOne({ studentID });

    if (existingStudent) {

      return res.json({
        message: "Student already exists"
      });

    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    const newStudent = new User({

      studentID,

      password: hashedPassword,

      role: "student"

    });

    await newStudent.save();

    res.json({
      message: "Student registered successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



// STUDENT LOGIN

router.post("/student-login", async (req, res) => {

  try {

    const { studentID, password } = req.body;

    const student =
      await User.findOne({
        studentID,
        role: "student"
      });

    if (!student) {

      return res.json({
        message: "Invalid credentials"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        student.password
      );

    if (!isMatch) {

      return res.json({
        message: "Invalid credentials"
      });

    }

    const token = jwt.sign(

      {
        id: student._id,
        role: student.role
      },

      "jwtSecretKey",

      {
        expiresIn: "1h"
      }

    );

    res.cookie("token", token);

    req.session.user = {
      id: student._id,
      role: student.role
    };

    res.json({
      message: "success",
      token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



module.exports = router;