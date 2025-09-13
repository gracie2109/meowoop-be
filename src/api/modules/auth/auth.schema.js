import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.google_id;
      },
    },
    google_id: {
      type: String,
      sparse: true,
      unique: true,
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
    last_login_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
authSchema.index({ user_id: 1 });
authSchema.index({ google_id: 1 });
authSchema.index({ "refresh_tokens.token": 1 });

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
