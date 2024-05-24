import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  loginToken: {
    type: String,
    required: false,
  },
});

export default mongoose.model("User", UserSchema);
