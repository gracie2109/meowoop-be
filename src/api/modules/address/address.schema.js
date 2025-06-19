import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const userAddressSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    label: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    provider: {
      code: { type: String },
      name: { type: String },
      level: {type: Number, default: 1}
    },
    district: {
      provider_id: { type: String },
      code: { type: String },
      name: { type: String },
    },
    ward: {
      code: { type: String },
      name: { type: String },
      district_id: { type: String },
    },
    street: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true,
  }
);

userAddressSchema.plugin(mongooseAutoPopulate);
userAddressSchema.plugin(mongooseLeanVirtuals);
userAddressSchema.plugin(mongoosePaginate);

const AddressModel = mongoose.model("Address", userAddressSchema);

export default AddressModel;
