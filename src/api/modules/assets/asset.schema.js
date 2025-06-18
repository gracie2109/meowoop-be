import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
  resource_type: { type: String },
  folder: { type: String },
  original_name: { type: String },
  created_at: { type: Date, default: Date.now },
});

export const Asset = mongoose.model('Asset', assetSchema);
