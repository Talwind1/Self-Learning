const mongoose = require("mongoose");
const validator = require("validator");
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
  tokens: [
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

//token is a signature we create to identify the user- for his actions in the app.
//'authenicated user' can change and act in his account.
//create and manage tokens: we'll do it with jwt- json wrb token library (package)
//expire tokens.
// instead of jwt - we require bcrypt.
//jws.sign - creatS token, two argument:
// 1- data which ambaded in the token
// 2- secret- random series of characters
//3-(optional) - options- object, we add '{expiresIn: '7 days'}

//TOKEN is create data that verifieable via the signature.
// base64 string - is a langueage that our string translated to.
//the signature is verified the token

//jwt.verify- is compare between the token and the original signature.

//reusable function for creation of tokens.

// check router.post('/users/login)

// userSchema.methods.generateAuthToken = async function (){

// }
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "uniqueSentence");
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//Middleware:
// middleware allow us to add a function between request and response:
// new request --> do somethinf --> new route handler.
//costumise to feet our needs.

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Unable to login ");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.token;

  return userObject;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
