import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true,
  },
  clinic_name: { type: String },
  department: { type: String }, // phòng khám, quầy tiếp tân, hành chính...

  specialization: { type: String }, // nếu là bác sĩ
  degree: { type: String }, // bằng cấp
  experience_years: { type: Number },
  bio: { type: String },
  avatar_url: { type: String },

  available_slots: [
    {
      day: {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      start_time: { type: String },
      end_time: { type: String },
    },
  ],

  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

// Indexing
EmployeeSchema.index({ specialization: 1, clinic_name: 1 });

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
