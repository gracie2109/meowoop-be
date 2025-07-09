import mongoose from "mongoose";

export const examinationDetailSchema = new mongoose.Schema({
  pet_id: { type: mongoose.Types.ObjectId, ref: 'Pet', required: true }, // FHIR.subject
  veterinarian_id: { type: mongoose.Types.ObjectId, ref: 'Employee', required: true }, // FHIR.participant
  appointment_id: { type: mongoose.Types.ObjectId, ref: 'Appointment' }, // FHIR.basedOn
  date: { type: Date, default: Date.now }, // FHIR.period.start
  weight: Number, // FHIR.Observation.valueQuantity
  temperature: Number,
  symptoms: [String], // FHIR.Observation.code
  diagnosis: String, // FHIR.Condition.code
  treatments: [String], // FHIR.Procedure.code
  medications: [{ name: String, dosage: String, usage: String }], // FHIR.MedicationRequest
  follow_up_date: Date,
  notes: String
}, { timestamps: true });

export const ExaminationDetail = mongoose.model("ExaminationDetail", examinationDetailSchema);
