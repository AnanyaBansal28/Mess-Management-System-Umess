const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectDB = require("./config/db");
const express = require("express");
const path = require("path");
const http = require("http");

const { Server } = require("socket.io");

const usersRoute = require("./routes/users");
const menuRoute = require("./routes/menu");
const mealRoute = require("./routes/meal");
const attendanceRoute = require("./routes/attendance");
const billRoute = require("./routes/bill");
const authRoute = require("./routes/auth");
const feedbackRoute = require("./routes/feedback");
const inventoryRoute = require("./routes/inventory");
const feedbackAdminRoute = require("./routes/feedback_admin");
const attendanceTrackingRoute = require("./routes/attendancetracking");
const analyticsRoute = require("./routes/analytics");
const suppliersRoute = require("./routes/suppliers");

const app = express();

app.set(
"view engine",
"ejs"
);

app.set(
"views",
path.join(__dirname,"views")
);

app.use(express.json());

app.use(express.urlencoded({
extended:true
}));

app.use(cookieParser());

app.use(session({

secret:"umessSecretKey",

resave:false,

saveUninitialized:true,

cookie:{
secure:false,
maxAge:1000 * 60 * 60
}

}));



app.use(express.static(path.join(__dirname, "../frontend")));



app.use("/api/users", usersRoute);

app.use("/api/menu", menuRoute);

app.use("/api/meal", mealRoute);

app.use("/api/auth", authRoute);

app.use("/api/attendance", attendanceRoute);

app.use("/api/bill", billRoute);

app.use("/api/feedback", feedbackRoute);

app.use("/api/inventory", inventoryRoute);

app.use("/api/feedback_admin", feedbackAdminRoute);

app.use("/api/attendencetracking", attendanceTrackingRoute);

app.use("/api/analytics", analyticsRoute);

app.use("/api/suppliers", suppliersRoute);




app.get("/api/test",(req,res)=>{

res.json({
message:"Server working"
});

});



app.get("/",(req,res)=>{

res.render(

"index",

{
name:"Gurasees",
time:new Date().toLocaleString()
}

);

});




connectDB();




const server =
http.createServer(app);



const io =
new Server(server);



io.on("connection",(socket)=>{

console.log("User connected");



socket.on(

"mealSelected",

(data)=>{

console.log(
"Meal Selected:",
data.meal
);

io.emit(

"mealNotification",

{
message:
data.meal +
" selected"
}

);

}

);



socket.on("disconnect",()=>{

console.log("User disconnected");

});

});



app.set("io", io);


server.listen(3000,()=>{

console.log(
"Server running on port 3000"
);

});