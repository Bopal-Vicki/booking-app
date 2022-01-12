const express = require("express");
const getmovies = require("../utils/getmovies");
const Order = require("../models/orderModel");
const axios = require("axios");
const auth = require("../middleware/auth");

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
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/book", auth, async (req, res) => {
  res.status(200).send();
});

module.exports = router;
