const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")
const { v4: uuidv4 } = require("uuid");

require("dotenv").config()

router.post("/getGoals", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ error: "Email is required" });
    }
  
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({ error: "User not found" });
        }
  
        const goals = savedUser.goals;
        return res.status(200).json({ goals: goals });
      })
      .catch((err) => {
        console.log(err);
        return res.status(422).json({ error: "Error while finding user" });
      });
  });
  
  
module.exports=router