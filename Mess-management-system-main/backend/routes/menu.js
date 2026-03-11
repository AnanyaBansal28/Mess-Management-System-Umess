const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router()

const filePath =
path.join(__dirname,"../data/menu.json")

function readMenu(){
return JSON.parse(
fs.readFileSync(filePath)
)
}

function saveMenu(data){
fs.writeFileSync(
filePath,
JSON.stringify(data,null,2)
)
}


router.get("/",(req,res)=>{
res.json(readMenu())
})


router.post("/add",(req,res)=>{

let menu = readMenu()

const {type,name,price,category} = req.body

menu[type].push({name,price,category})

saveMenu(menu)

res.json({msg:"added"})

})


router.post("/delete",(req,res)=>{

let menu = readMenu()

const {type,index} = req.body

menu[type].splice(index,1)

saveMenu(menu)

res.json({msg:"deleted"})

})


router.post("/edit",(req,res)=>{

let menu = readMenu()

const {type,index,name,price} = req.body

menu[type][index].name=name
menu[type][index].price=price

saveMenu(menu)

res.json({msg:"edited"})

})


module.exports = router