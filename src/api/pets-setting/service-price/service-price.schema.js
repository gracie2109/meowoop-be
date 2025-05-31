import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const petServicePriceSchema = new mongoose.Schema(
  {
    pet_id: {
      type: mongoose.Types.ObjectId,
      ref: "Pets",
      required: true,
      // autopopulate: true,
    },
    service_id: {
      type: mongoose.Types.ObjectId,
      ref: "PetService",
      required: true,
      //  autopopulate: true,
    },
    weight_id: {
      type: mongoose.Types.ObjectId,
      ref: "petWeight",
      required: true,
      autopopulate: true,
    },
    price: {
      type: Object,
      default: null,
    },
    duration: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true,
  }
);

petServicePriceSchema.plugin(mongooseAutoPopulate);
petServicePriceSchema.plugin(mongooseLeanVirtuals);
petServicePriceSchema.plugin(mongoosePaginate);

const PetServicePriceModel = mongoose.model(
  "PetServicePrice",
  petServicePriceSchema
);

export default PetServicePriceModel;
