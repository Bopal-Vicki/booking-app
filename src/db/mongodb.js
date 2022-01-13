const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://boopalan:bKEJ4peodWR3XOYw@cluster0.scngs.mongodb.net/booking-app?retryWrites=true",
  () => {
    console.log("connected");
  }
);
