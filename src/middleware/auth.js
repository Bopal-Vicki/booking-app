const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new Error("login or signup first");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) throw new Error("login or signup first");
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send();
  }
};

module.exports = auth;
