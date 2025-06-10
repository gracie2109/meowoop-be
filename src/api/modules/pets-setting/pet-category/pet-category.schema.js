import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const petCategorySchema = new mongoose.Schema(
  {
    name: {
      vi: {
        type: String,
        require: true,
        trim: true,
      },
      en: {
        type: String,
        require: true,
        trim: true,
      },
    },

    description: {
      vi: {
        type: String,
        require: true,
        trim: true,
      },
      en: {
        type: String,
        require: true,
        trim: true,
      },
    },
    status: {
      type: Boolean,
      default: true,
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

petCategorySchema.plugin(mongooseAutoPopulate);
petCategorySchema.plugin(mongooseLeanVirtuals);
petCategorySchema.plugin(mongoosePaginate);

const PetCategoryModel = mongoose.model("PetCategory", petCategorySchema);

export default PetCategoryModel;
