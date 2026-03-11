const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath =
path.join(
__dirname,
"../data/feedback_admin.json"
);


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

const {id,status,response} =
req.body;

const item =
data.find(
f=>f.id==id
);

if(item){

if(status)
item.status=status;

if(response)
item.response=response;

}

fs.writeFileSync(
filePath,
JSON.stringify(
data,
null,
2
)
);

res.json(data);

});

module.exports = router;