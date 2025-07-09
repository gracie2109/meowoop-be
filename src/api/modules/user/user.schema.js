import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.google_id;
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    google_id: {
      type: String,
      sparse: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    phone_number: {
      type: String,
    },
    locale: {
      type: String,
      default: "vi",
    },
    role: {
      type: String,
      enum: ["owner", "veterinarian", "staff", "admin"],
      default: "owner",
      index: true,
    },
    password_changed_at: {
      type: Date,
    },
    refresh_tokens: [
      {
        token: String,
        expires_at: Date,
        created_at: {
          type: Date,
          default: Date.now,
        },
        device_info: {
          platform: String,
          browser: String,
          ip: String,
        },
        is_revoked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    last_login_at: {
      type: Date,
    },
    default_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      autopopulate: true,
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ google_id: 1 });
userSchema.index({ "refresh_tokens.token": 1 });
userSchema.index({ name: "text", email: "text" });

// Plugins
userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

export default User;
