//hashed password is secure to store. It created by Hashed algorithm.
// bcrypt.js is a library of node.js
const express = require("express");
const router = require("./userRouter");
require("./mongoose"); //brings the connect to the database.
const app = express();
const cors = require("cors");
const taskRouter = require("./taskRouter");
const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon");
// });
app.use(express.json());
app.use(cors());

app.use("/", router);

app.use(taskRouter);
app.use((req, res, next) => {
  console.log(req.method, req.path);

  next();
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const Task = require("./taskModel");
const User = require("./userModel");

const main = async () => {
  const task = await Task.findById("61f4ea2ab84a2fdce83c8081");
  const user = await User.findById("61f18ef099724c48188b2750");
  console.log(task.owner);
  await user.populate("tasks").execPopulate(); //a method to convert from id to the entire profile
  new ObjectId("61f18ef099724c48188b2750");
  // await task.populate("owner").executePopulate(); //find out the user associate with the task
  // console.log(task.owner);
  //
};

//main();
