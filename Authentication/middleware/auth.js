//middlleware diredtory
const jwt = require("jsonwebtoken");
const User = require("../userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "uniqueSentence"); //valid that token created by our server and hadn't expired.
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    }); // find the user with this id and its token (if he logged out the token is invalid)

    if (!user) {
      throw new Error();
    }
    console.log("founnddd");
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send({ error: "Please authenticates hi" });
  }
};
module.exports = auth;
