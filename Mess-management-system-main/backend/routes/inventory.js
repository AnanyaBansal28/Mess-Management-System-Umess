const express = require("express");

const router = express.Router();

const Inventory = require("../models/Inventory");


// GET all inventory items
router.get("/", async (req,res)=>{

  try{

    const items =
    await Inventory.find();

    res.json(items);

  }catch(err){

    res.status(500).json({
      error: err.message
    });

  }

});


// ADD new inventory item
router.post("/add", async (req,res)=>{

  try{

    const {
      name,
      category,
      stock,
      price
    } = req.body;

    const newItem =
    new Inventory({
      name,
      category,
      stock,
      price
    });

    await newItem.save();

    res.json(newItem);

  }catch(err){

    res.status(500).json({
      error: err.message
    });

  }

});


// UPDATE stock
router.post("/", async (req,res)=>{

  try{

    const {
      name,
      stock
    } = req.body;

    const item =
    await Inventory.findOneAndUpdate(
      {name:name},
      {stock:stock},
      {new:true}
    );

    res.json(item);

  }catch(err){

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;