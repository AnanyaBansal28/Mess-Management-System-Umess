const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath =
path.join(__dirname,"../data/inventory.json");


// GET

router.get("/", (req,res)=>{

const data =
JSON.parse(
fs.readFileSync(filePath)
);

res.json(data);

});


// POST update

router.post("/", (req,res)=>{

const data =
JSON.parse(
fs.readFileSync(filePath)
);

const {name, stock} = req.body;

const item =
data.find(i=>i.name===name);

if(item){
item.stock = stock;
}

fs.writeFileSync(
filePath,
JSON.stringify(data,null,2)
);

res.json(data);

});

module.exports = router;