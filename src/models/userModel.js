const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const Order = require("../models/orderModel");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a user must have a name"],
    trim: true,
  },
  email: {
    unique: true,
    required: [true, "a user must have a email"],
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("provide a valid email");
    },
  },
  password: {
    type: String,
    minlength: [8, "password must be minimum of 8 characters"],
    required: true,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.virtual("bookings", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

userSchema.statics.validateCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("email or password is wrong");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("email or password is wrong");
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return token;
  } catch (e) {}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
