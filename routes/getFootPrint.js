const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/getFootPrint", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({ message: "Email is missing" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const footprint = user.footprint;

      return res.status(200).json({ footprint: footprint });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
