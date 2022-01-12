const express = require("express");
const hbs = require("hbs");

const router = new express.Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/movie/:id", async (req, res) => {
  res.render("movie");
});

module.exports = router;
