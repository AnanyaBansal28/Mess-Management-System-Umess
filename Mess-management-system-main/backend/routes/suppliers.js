const express = require("express");

const router = express.Router();

const Supplier = require("../models/Supplier");


// GET suppliers
router.get("/", async (req,res)=>{
  try{

    const suppliers =
    await Supplier.find();

    res.json(suppliers);

  }catch(err){
    res.status(500).json({
      error: err.message
    });
  }
});


// POST supplier
router.post("/", async (req,res)=>{
  try{

    const newSupplier =
    new Supplier(req.body);

    await newSupplier.save();

    res.json(newSupplier);

  }catch(err){
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;