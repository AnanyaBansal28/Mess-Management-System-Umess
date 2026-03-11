const express = require("express");
const path = require("path");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const menuRoute = require("./routes/menu");
const mealRoute = require("./routes/meal");
const attendanceRoute = require("./routes/attendance");
const billRoute = require("./routes/bill");
const feedbackRoute = require("./routes/feedback");
const inventoryRoute = require("./routes/inventory");
const feedbackAdminRoute = require("./routes/feedback_admin");
const attendanceTrackingRoute = require("./routes/attendencetracking");
const analyticsRoute =require("./routes/analytics");
const suppliersRoute =require("./routes/suppliers");
const app = express();

app.use("/api/auth", authRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(
path.join(__dirname, "../")
));



app.use("/api/users", usersRoute);
app.use("/api/menu", menuRoute);
app.use("/api/meal", mealRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/bill", billRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/feedback_admin", feedbackAdminRoute);
app.use("/api/attendencetracking", attendanceTrackingRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/suppliers", suppliersRoute);

app.get("/api/test", (req, res) => {
res.json({ message: "Server working" });
});


app.listen(3000, () => {
console.log("Server running on port 3000");
});