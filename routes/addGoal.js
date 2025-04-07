const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")
const { v4: uuidv4 } = require("uuid");

require("dotenv").config()

router.post("/addGoal", (req, res) => {
    const { email, title, description, carbonEmission } = req.body;
    if (!email || !title || !description || !carbonEmission) {
      return res.status(422).json({ error: "Required fields are missing" });
    } else {
        User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(200).json({ message: "Invalid Credentials" });
            }
            const existingGoal=savedUser.goals.find((goal)=>goal.title===title)
            if (existingGoal) {
                return res
                  .status(200)
                  .json({ message: "Goal with the same title already exists" });
              } else {

                const goalId = uuidv4();
                savedUser.goals.push({ title, description, carbonEmission, goalId});
                savedUser.save()
                    .then((user) => {
                        res.json({ message: "Goal added successfully" });
                    })
                    .catch((err) => {
                        res.json({ error: "Error adding Goal" });
                    });
              }

        })
        .catch((err) => {
          console.log(err);
          return res.status(422).json({ error: "Error while finding user" });
        });
    }
  });
  
module.exports=router