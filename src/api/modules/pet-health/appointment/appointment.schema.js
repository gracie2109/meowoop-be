import mongoose from "mongoose";
import { DEFAULT_PRIORITY } from "../contants";

const appointmentSchema = new mongoose.Schema({
  pet_id: {
    type: mongoose.Types.ObjectId,
    ref: "Boss",
  },
  owner_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service_id: {
    type: mongoose.Types.ObjectId,
    ref: "PetService",
  },
  veterinarian_id: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  reason: { type: String }, // ví dụ: Khám định kỳ, tiêm phòng, triệu chứng lạ...
  note: { type: String },
  appointment_time: { type: Date, required: true },
  priority: { //Used to make informed decisions if needing to re-prioritize
    enum: APPOIMENT_PRIORITY,
    default: DEFAULT_PRIORITY,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "canceled", "no_show"],
    default: "pending",
  },
});
export const Appointment = mongoose.model("Appointment", appointmentSchema);
