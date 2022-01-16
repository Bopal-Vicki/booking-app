const express = require("express");
const getmovies = require("../utils/getmovies");
const Order = require("../models/orderModel");
const axios = require("axios");
const auth = require("../middleware/auth");
const sendMail = require("../emails/email");

const router = new express.Router();

router.get("/movies", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&region=IN`
    );
    await getmovies(result.data.total_pages).then((resolve) => {
      res.send(resolve);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
    );
    res.status(200).send(result.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/order", auth, async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${process.env.API_KEY}`
    );
    const movieName = result.data.original_title;
    const order = new Order({ ...req.body, user: req.user._id });
    await order.save();
    await sendMail(req.user.email, req.user.name, movieName);
    await res.status(201).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/bookings", auth, async (req, res) => {
  try {
    const user = req.user;
    await user.populate("bookings");
    res.status(200).send(user.bookings);
  } catch (e) {
    console.log(e);
  }
});

router.get("/book", auth, async (req, res) => {
  res.status(200).send();
});

module.exports = router;
