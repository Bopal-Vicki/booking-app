const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = `mongodb+srv://boopalan:bKEJ4peodWR3XOYw@cluster0.scngs.mongodb.net/booking-app?retryWrites=true&w=majority`;

mongoose.connect(mongoURL, () => {});
