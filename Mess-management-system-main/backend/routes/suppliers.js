const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath =
path.join(
__dirname,
"../data/suppliers.json"
);


// GET suppliers

router.get("/", (req,res)=>{

const data =
JSON.parse(
fs.readFileSync(filePath,"utf-8")
);

res.json(data);

});


module.exports = router;