import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isMailVerified: { type: Boolean, default: false },
  history: [
    {
      booking: { type: String, required: true },
      date: { type: Date, required: true },
      paymentStatus: { type: String, enum: ["Paid", "Pending"], required: true },
      confirmation: { type: String, enum: ["Confirmed", "Pending"], required: true },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
