const mongoose = require("mongoose");

const attendanceTrackingSchema = new mongoose.Schema({
name:String,
roll:String,
breakfast:Boolean,
lunch:Boolean,
dinner:Boolean
});

module.exports = mongoose.model(
"AttendanceTracking",
attendanceTrackingSchema
);