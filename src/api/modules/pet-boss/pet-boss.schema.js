import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const bossSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    owner_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    animal_type: {
      type: mongoose.Types.ObjectId,
      ref: "Pets",
      required: true,
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
    // health_book: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "PetHealth",
    // },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: false,
      default: null,
      set: function (value) {
        // Handle empty array or invalid values
        if (Array.isArray(value) && value.length === 0) return null;
        if (!value || value === "" || value === "null") return null;
        return value;
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
bossSchema.plugin(mongooseAutoPopulate);
bossSchema.plugin(mongooseLeanVirtuals);
bossSchema.plugin(mongoosePaginate);

const BossModel = mongoose.model("Boss", bossSchema);
export default BossModel;
