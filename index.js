const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
require('./models/User');
const addUser=require("./routes/addUser")
const getFootPrint=require("./routes/getFootPrint")
const increaseFootPrint=require("./routes/increaseFootPrint")
const getHandPrint=require("./routes/getHandPrint")
const increaseHandPrint=require("./routes/increaseHandPrint")
const addGoal=require("./routes/addGoal")
const getGoals=require("./routes/getGoals")
const deleteGoal=require("./routes/deleteGoal")
require('./db');
app.use(bodyParser.json());
app.use(addUser)
app.use(getFootPrint)
app.use(increaseFootPrint)
app.use(getHandPrint)
app.use(increaseHandPrint)
app.use(addGoal)
app.use(getGoals)
app.use(deleteGoal)
app.listen(port, () => {
    console.log("Server is running on port " + port);
})