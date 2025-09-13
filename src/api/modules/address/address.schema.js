import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const userAddressSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: { type: String, default: "" },
    coordinates: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    detail: { type: String, required: true },
    provider_code: { type: String },
    provider_name: { type: String, required: true },

    district_name: { type: String, required: true },
    district_code: { type: String, required: true },

    ward_code: { type: String },
    ward_name: { type: String },

    is_primary: { type: Boolean, default: false },
    phone_number: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userAddressSchema.virtual("fullAddress").get(function () {
  const parts = [
    this.detail,
    this.ward_name,
    this.district_name,
    this.city_name,
  ];
  return parts.filter((part) => part && part.trim()).join(", ");
});

userAddressSchema.plugin(mongooseAutoPopulate);
userAddressSchema.plugin(mongooseLeanVirtuals);
userAddressSchema.plugin(mongoosePaginate);

const AddressModel = mongoose.model("Address", userAddressSchema);

export default AddressModel;
