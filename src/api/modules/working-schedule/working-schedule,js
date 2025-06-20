import mongoose from "mongoose";
const workingScheduleSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },
    
    date: {
      type: Date,
      required: true,
    },
    shift_type: {
      type: String,
      enum: ["morning", "afternoon", "evening", "full_day", "custom"],
      required: true,
    },
    start_time: { type: String }, // optional nếu dùng "custom"
    end_time: { type: String },
    note: { type: String },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const WorkingSchedule = mongoose.model("WorkingSchedule", workingScheduleSchema);
export default WorkingSchedule;

