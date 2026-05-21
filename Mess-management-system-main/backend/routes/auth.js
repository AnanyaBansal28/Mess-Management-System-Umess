const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();



// ================= ADMIN SIGNUP =================

router.post("/admin-signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK EXISTING ADMIN
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });

    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // CREATE ADMIN
    const newUser = new User({

      name,
      email,
      password: hashedPassword,
      role: "admin"

    });

    await newUser.save();

    res.status(200).json({

      success: true,
      message: "Admin registered successfully"

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

});



// ================= ADMIN LOGIN =================

router.post("/admin-login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND ADMIN
    const admin = await User.findOne({

      email,
      role: "admin"

    });

    if (!admin) {

      return res.status(400).json({

        success: false,
        message: "Invalid credentials"

      });

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,
        message: "Invalid credentials"

      });

    }

    // CREATE TOKEN
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

    res.status(200).json({

      success: true,
      message: "Login successful",
      token

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

});



// ================= STUDENT SIGNUP =================

router.post("/student-signup", async (req, res) => {

  try {

    const { studentID, password } = req.body;

    // CHECK EXISTING STUDENT
    const existingStudent =
      await User.findOne({ studentID });

    if (existingStudent) {

      return res.status(400).json({

        success: false,
        message: "Student already exists"

      });

    }

    // HASH PASSWORD
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // CREATE STUDENT
    const newStudent = new User({

      studentID,
      password: hashedPassword,
      role: "student"

    });

    await newStudent.save();

    res.status(200).json({

      success: true,
      message: "Student registered successfully"

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

});



// ================= STUDENT LOGIN =================

router.post("/student-login", async (req, res) => {

  try {

    const { studentID, password } = req.body;

    // FIND STUDENT
    const student = await User.findOne({

      studentID,
      role: "student"

    });

    if (!student) {

      return res.status(400).json({

        success: false,
        message: "Invalid credentials"

      });

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        student.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,
        message: "Invalid credentials"

      });

    }

    // CREATE TOKEN
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

    // SAVE COOKIE
    res.cookie("token", token);

    // SAVE SESSION
    req.session.user = {

      id: student._id,
      role: student.role

    };

    res.status(200).json({

      success: true,
      message: "Login successful",
      token

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

});



module.exports = router;