const mongoose = require("mongoose");
const User = require("../models/userModel");

const orderSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
    },
    seats: {
      type: Number,
      validate(value) {
        if (value <= 0) throw new Error("seat cannot be empty");
      },
    },
    movieName: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
