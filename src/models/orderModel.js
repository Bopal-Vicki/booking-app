const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
