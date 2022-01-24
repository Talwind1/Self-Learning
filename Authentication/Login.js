//hashed password is secure to store. It created by Hashed algorithm.
// bcrypt.js is a library of node.js

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const bcrypt = require("bcrypt");

const myFunction = async () => {
  const password = "taltul123"; //the user provide us a text pass
  const hashedPass = await bcrypt.hash(password, 8); //returns a promise, 8 is number of rounds the algoritm run

  console.log(password);
  console.log(hashedPass);
  //hasing algoritm are not reverseble- there is no way to get the plain pass from the hashed pass.

  const isMatch = await bcrypt.compare(password, hashedPass); //returns a promise, should be true
  console.log(isMatch);
  console.log(await bcrypt.compare(password.toUpperCase(), hashedPass)); //returns false.
};

const jwt = require("jsonwebtoken");
const myFunction2 = async () => {
  const token = jwt.sign(
    { _id: "abc123" },
    "thisismynewcourse",
    /*options*/ { expiresIn: "7 days" }
  ); // creates data that verfied this signature. made of first argument data and time created.
  console.log(token);
  const data = jwt.verify(token, "thisismynewcourse"); //check if token is valid

  console.log(data);
};
myFunction2();
