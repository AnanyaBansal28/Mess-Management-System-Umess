const express = require("express");

const router = express.Router();

const Menu = require("../models/Menu");




// GET MENU

router.get("/", async (req, res) => {

  try {

    const items = await Menu.find();

    let menu = {

      breakfast: [],
      lunch: [],
      dinner: []

    };

    items.forEach(item => {

      menu[item.type].push(item);

    });

    res.json(menu);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



// ADD ITEM WITH IMAGE

router.post("/add", async (req, res) => {

  try {

    const {
  type,
  name,
  price,
  category,
  image
} = req.body;

    const newItem =
    new Menu({

      type,
      name,
      price,
      category,

      image: image

    });

    await newItem.save();

    res.json({
      msg: "added"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



// DELETE ITEM

router.post("/delete", async (req, res) => {

  try {

    const { id } = req.body;

    await Menu.findByIdAndDelete(id);

    res.json({
      msg: "deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



// EDIT ITEM

router.post("/edit", async (req, res) => {

  try {

    const {
      id,
      name,
      price
    } = req.body;

    await Menu.findByIdAndUpdate(id, {

      name,
      price

    });

    res.json({
      msg: "edited"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});



module.exports = router;