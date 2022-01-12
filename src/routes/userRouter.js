const express = require("express");
require("../db/mongodb");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30 * 60 * 1000),
      httpOnly: true,
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.validateCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30 * 60 * 1000),
      httpOnly: true,
      secure: true,
    });
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/users/logout", auth, async (req, res) => {
  try {
    res.cookie("jwt", "logged out", {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
      secure: true,
    });
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
