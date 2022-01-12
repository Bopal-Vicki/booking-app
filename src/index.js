const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const hbs = require("hbs");
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const viewRouter = require("./routes/viewRouter");
const cookieParser = require("cookie-parser");
const isLoggedIn = require("./middleware/islogged");

const app = express();

app.set("view engine", "hbs");
app.set("views", "./src/templates/views");
hbs.registerPartials("./src/templates/PARTIALS");

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(cookieParser());
app.use(isLoggedIn);
app.use(userRouter);
app.use(movieRouter);
app.use(viewRouter);

require("dotenv").config();

mongoose.connect(process.env.MONGOURL, () => {
  console.log("connected");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {});
