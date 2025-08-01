import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.firebaseUID;
      },
      minLength: [6, "Password must be at least 6 characters long"],
    },
    avatar: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    firebaseUID: { type: String, default: null, unique: true, sparse: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
