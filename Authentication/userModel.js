const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//we going to create an object which define all the properties for that schema.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //make sure the string is trimmed (=there's no spaces allowed.)
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  token: [
    {
      //allowed the user to connect from different devices.
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this; //this is equal to the document which being saved.

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  console.log("just before saving!   ");
  next(); //is the function that executed right after the middleware method, important to remember!
}); //middleware methods
const User = mongoose.model("User", userSchema);

const jwt = require("jsonwebtoken");

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "thisismynewcourse",
    /*options*/ { expiresIn: "7 days" }
  ); // creates data that verfied this signature. made of first argument data and time created.
  user.tokens.concat({ token });
  await user.save();
};

const myFunction2 = async () => {
  //  console.log(token);
  const data = jwt.verify(token, "thisismynewcourse"); //check if token is valid

  console.log(data);
};
