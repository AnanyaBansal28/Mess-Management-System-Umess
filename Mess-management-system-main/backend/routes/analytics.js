const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath =
path.join(
__dirname,
"../data/analytics.json"
);


// GET analytics

router.get("/", (req,res)=>{

const data =
JSON.parse(
fs.readFileSync(filePath,"utf-8")
);

res.json(data);

});


module.exports = router;