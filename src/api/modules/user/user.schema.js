import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // required: true,
      trim: true,
      lowercase: true,
      sparse: true, // Cho phép multiple null values
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
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
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["0", "1", "2"],
    },
    phone_number: {
      type: String,
      unique: true,
      sparse: true, // Cho phép multiple null values
    },
    locale: {
      type: String,
      default: "vi",
    },
    role: {
      type: String,
      enum: ["owner", "veterinarian", "staff", "admin", "user"],
      default: "user",
      index: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    default_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes với sparse để xử lý null values
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ phone_number: 1 }, { unique: true, sparse: true });
userSchema.index({ name: "text", email: "text" });

// Plugins
userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

export default User;
