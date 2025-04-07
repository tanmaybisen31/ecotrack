const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/getHandPrint", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({ message: "Email is missing" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const handprint = user.handprint;

      return res.status(200).json({ handprint: handprint });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
