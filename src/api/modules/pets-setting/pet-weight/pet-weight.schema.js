import mongoose from "mongoose";

const petWeightSchema = new mongoose.Schema(
  {
    key: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true,
  }
);
const PetWeightModel = mongoose.model("petWeight", petWeightSchema);

export default PetWeightModel;
