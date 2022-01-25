//hashed password is secure to store. It created by Hashed algorithm.
// bcrypt.js is a library of node.js
const express = require("express");
const router = require("./userRouter");
require("./mongoose"); //brings the connect to the database.
const app = express();

const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon");
// });
app.use(express.json());
app.use(router);

app.use((req, res, next) => {
  console.log(req.method, req.path);

  next();
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
