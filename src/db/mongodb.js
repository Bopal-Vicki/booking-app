const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = `mongodb+srv://boopalan:${process.env.DB_PASSWORD}@cluster0.scngs.mongodb.net/booking-app?retryWrites=true&w=majority`;

mongoose.connect(mongoURL, () => {});
