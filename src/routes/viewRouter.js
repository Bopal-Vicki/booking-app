const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const router = new express.Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/login", async (req, res) => {
  if (req.cookies.jwt && req.cookies.jwt != "logged out") {
    console.log(req.cookies.jwt);
    res.locals.sign = true;
    res.render("index", {
      error: "you are already logged in.",
    });
  } else {
    res.render("login");
  }
});

router.get("/signup", async (req, res) => {
  if (req.cookies.jwt && req.cookies.jwt != "logged out") {
    res.locals.sign = true;
    res.render("index", {
      error: "you are already logged in.",
    });
  } else res.render("signup");
});

router.get("/movie/:id", async (req, res) => {
  const id = req.params.id;
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  const p = result.data.original_title;
  const p1 = `description:${result.data.overview}`;
  const imageUrl = `https://image.tmdb.org/t/p/w200/${result.data.poster_path}`;

  res.render("movie", {
    imageUrl,
    p,
    p1,
  });
});

router.get("/account", async (req, res) => {
  try {
    res.status(200).render("account");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
