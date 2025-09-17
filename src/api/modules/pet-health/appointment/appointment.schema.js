import mongoose from "mongoose";
import { APPOIMENT_PRIORITY, DEFAULT_PRIORITY } from "../contants";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

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
  priority:  { type: String },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "canceled", "no_show"],
    default: "pending",
  },
});
appointmentSchema.plugin(mongooseAutoPopulate);
appointmentSchema.plugin(mongooseLeanVirtuals);
appointmentSchema.plugin(mongoosePaginate);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
