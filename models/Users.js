import mongoose from "mongoose";

// Defining Schema
const usersSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  isEmailVerified: { type: Boolean },
 });

// Model
const UsersModel = mongoose.model("users", usersSchema);

export default UsersModel;
