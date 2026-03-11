const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFile = path.join(__dirname, "../data/users.json");
const logsFile = path.join(__dirname, "../data/authLogs.json");


function readUsers(){
return JSON.parse(fs.readFileSync(usersFile));
}

function saveUsers(data){
fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));
}

function readLogs(){
return JSON.parse(fs.readFileSync(logsFile));
}

function saveLogs(data){
fs.writeFileSync(logsFile, JSON.stringify(data, null, 2));
}



router.post("/admin-signup", (req,res)=>{

const {name,email,password} = req.body;

let users = readUsers();

users.push({
name,
email,
password,
role:"admin"
});

saveUsers(users);

let logs = readLogs();

logs.push({
email:email,
action:"admin signup",
time:new Date().toLocaleString()
});

saveLogs(logs);

res.json({message:"Admin registered"});

});



router.post("/admin-login", (req,res)=>{

const {email,password} = req.body;

let users = readUsers();

const admin = users.find(
u => u.email===email && u.password===password && u.role==="admin"
);

if(admin){

let logs = readLogs();

logs.push({
email:email,
action:"admin login",
time:new Date().toLocaleString()
});

saveLogs(logs);

res.json({message:"success"});

}else{

res.json({message:"Invalid credentials"});

}

});



router.post("/student-signup",(req,res)=>{

const {studentID,password} = req.body;

let users = readUsers();

users.push({
studentID,
password,
role:"student"
});

saveUsers(users);

let logs = readLogs();

logs.push({
studentID:studentID,
action:"student signup",
time:new Date().toLocaleString()
});

saveLogs(logs);

res.json({message:"Student registered"});

});



router.post("/student-login",(req,res)=>{

const {studentID,password} = req.body;

let users = readUsers();

const student = users.find(
u => u.studentID===studentID && u.password===password && u.role==="student"
);

if(student){

let logs = readLogs();

logs.push({
studentID:studentID,
action:"student login",
time:new Date().toLocaleString()
});

saveLogs(logs);

res.json({message:"success"});

}else{

res.json({message:"Invalid credentials"});

}

});



module.exports = router;