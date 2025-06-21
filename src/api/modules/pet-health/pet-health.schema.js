import mongoose from "mongoose";
import { EXAMINATION_TYPE_KEY, PET_HEALTH_OVERALL_KEY } from "./contants";

const healthRecordSchema = new mongoose.Schema({
  record_type: {
    type: String,
    required: true,
    enum: EXAMINATION_TYPE_KEY,
  },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String },
  veterinarian: {
    id: { type: mongoose.Types.ObjectId, ref: "Employee" },
    name: { type: String },
    specialty: { type: String },
  },
  cost: { type: Number },
  details: [
    {
      key: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed },
      unit: {
        type: String,
        enum: ["kg", "g", "cm", "mmHg", "°C", "bpm", "custom"],
      },
    },
  ],
  attachments: [
    {
      type: { type: String },
      url: { type: String },
      description: { type: String },
    },
  ],
  next_followup: { type: Date },
  is_completed: { type: Boolean, default: false },
});

const petHealthSchema = new mongoose.Schema(
  {
    pet_id: {
      type: mongoose.Types.ObjectId,
      ref: "Boss",
      required: true,
      index: true,
    },
    owner_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    records: [healthRecordSchema],

    profiles_data: [ // thông tin ngoài lề ( thói quen ăn uống/ dị ứng...)
      {
        field_name: { type: String, required: true },
        field_type: {
          type: String,
          enum: ["string", "number", "boolean", "date", "array"],
        },
        value: { type: mongoose.Schema.Types.Mixed },
      },
    ],

    alerts: [
      {
        type: {
          type: String,
          enum: ["vaccine", "checkup", "medication", "custom"],
        },
        due_date: { type: Date },
        title: { type: String },
        description: { type: String },
        is_completed: { type: Boolean, default: false },
        completed_at: { type: Date },
      },
    ],
    preferences: {
      preferred_veterinarian: { type: String },
      preferred_clinic: { type: String },
      insurance_info: { type: String },
      emergency_contacts: [
        {
          name: { type: String },
          phone: { type: String },
          relationship: { type: String },
        },
      ],
    },
    status: {
      overall: {
        type: String,
        enum: PET_HEALTH_OVERALL_KEY,
        default: PET_HEALTH_OVERALL_KEY.HEALTHY,
      },
      last_checkup: { type: Date },
      updated_by: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    history_logs: [
      {
        action: {
          type: String,
          enum: ["create", "update", "delete"],
        },
        user: { type: mongoose.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
        changes: { type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

petHealthSchema.virtual("vaccinations").get(function () {
  return this.records.filter((r) => r.record_type === "vaccination");
});

petHealthSchema.virtual("examinations").get(function () {
  return this.records.filter((r) => r.record_type === "examination");
});

petHealthSchema.index({ "records.date": 1 });
petHealthSchema.index({ "records.record_type": 1 });
petHealthSchema.index({ "alerts.due_date": 1 });
petHealthSchema.index({
  "records.title": "text",
  "records.description": "text",
});

petHealthSchema.pre("save", function (next) {
  this.alerts.forEach((alert) => {
    if (alert.due_date && alert.due_date < new Date() && !alert.is_completed) {
      alert.is_completed = true;
      alert.completed_at = new Date();
    }
  });
  next();
});

export const PetHealth = mongoose.model("PetHealth", petHealthSchema);
