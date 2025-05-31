import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const petServiceSchema = new mongoose.Schema(
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
    pet_type_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pets",
        autopopulate: true,
      },
    ],
    additional_data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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

petServiceSchema.plugin(mongooseAutoPopulate);
petServiceSchema.plugin(mongooseLeanVirtuals);
petServiceSchema.plugin(mongoosePaginate);

const PetServiceModel = mongoose.model("PetService", petServiceSchema);

export default PetServiceModel;
