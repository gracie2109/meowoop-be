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
      required: function() {
        return !this.googleId;
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    dob: {
          type: mongoose.Schema.Types.Mixed,
    },
    refreshTokens: [{
      token: String,
      expiresAt: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      deviceInfo: {
        type: String,
      },
      isRevoked: {
        type: Boolean,
        default: false,
      }
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ "refreshTokens.token": 1 });

// Plugins
userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

export default User;
