import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const roleSchema = new mongoose.Schema(
  {
    resource_actions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
      unique: true
    }],
    description: { type: String },
    name: { type: String, required: true , unique: true},
    status: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true,
  }
);
roleSchema.plugin(mongooseAutoPopulate);
roleSchema.plugin(mongooseLeanVirtuals);
roleSchema.plugin(mongoosePaginate);

export default mongoose.model("Role", roleSchema);
