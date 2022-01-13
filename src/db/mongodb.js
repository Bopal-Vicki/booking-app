const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL, () => {
  console.log("connected");
});
