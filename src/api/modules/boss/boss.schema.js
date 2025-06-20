import mongoose from "mongoose";

const bossSchema = new mongoose.Schema({
  name: { type: String },
  full_name: { type: String },
  owner_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  animal_type: {
    type: mongoose.Types.ObjectId,
    ref: "Pets",
  },
  profile_data: {
    dob: { type: String },
    breed: { type: String }, // giống loài
    gender: { type: String },
    hometown: { type: String },
  },
  indentifycation_card: {
    qr_code: { type: String },
    created_at: { type: String },
    code: { type: String },
  },
  regiser_card: { type: Boolean, default: false },
  health_book: {
    type: mongoose.Types.ObjectId,
    ref: "PetHealth",
  },
});

export const Boss = mongoose.model("Boss", bossSchema);
