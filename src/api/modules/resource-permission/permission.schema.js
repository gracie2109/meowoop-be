import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

const permissionSchema = new mongoose.Schema(
  {
    resource_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    action_name: { type: String, required: true },
    action_key: { type: String, required: true },
    status: {type: String}
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true,
  }
);
permissionSchema.plugin(mongooseAutoPopulate);
permissionSchema.plugin(mongooseLeanVirtuals);
permissionSchema.plugin(mongoosePaginate);

export default mongoose.model("Permission", permissionSchema);
