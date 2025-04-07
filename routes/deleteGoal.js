const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")

require("dotenv").config()

router.delete("/deleteGoal/:goalId", (req, res) => {
    const { email} = req.body;
    const { goalId } = req.params;
    if (!email || !goalId) {
      return res.status(422).json({ error: "Required fields are missing" });
    }
  
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(200).json({ message: "Invalid Credentials" });
        }
  
        const goalIndex = savedUser.goals.findIndex((goal) => goal.goalId === goalId);
        if (goalIndex === -1) {
          return res.status(200).json({ message: "Goal not found" });
        }
  
        savedUser.goals.splice(goalIndex, 1);
        savedUser
          .save()
          .then((user) => {
            res.json({ message: "Goal deleted successfully" });
          })
          .catch((err) => {
            res.json({ error: "Error deleting Goal" });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(422).json({ error: "Error while finding user" });
      });
  });
module.exports=router