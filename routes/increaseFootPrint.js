const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/increaseFootPrint", (req, res) => {
  const { email, footprint } = req.body;

  if (!email || !footprint) {
    return res.status(404).json({ message: "Email and Footprint are required" });
  }

  const footprintValue=Number(footprint)
  User.findOneAndUpdate(
    { email: email },
    { $push: { footprint: footprintValue} },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Footprint updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
