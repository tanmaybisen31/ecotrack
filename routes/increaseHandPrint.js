const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/increaseHandPrint", (req, res) => {
  const { email, handprint } = req.body;

  if (!email || !handprint) {
    return res.status(404).json({ message: "Email and Handprint are required" });
  }

  const handprintValue=Number(handprint)
  User.findOneAndUpdate(
    { email: email },
    { $push: { handprint: handprintValue} },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Handprint updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
