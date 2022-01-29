const express = require("express");
const router = new express.Router();
const User = require("./userModel");
const auth = require("./middleware/auth");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken(); //?
    await user.save();
    console.log(user);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    //  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) //new? runValidators?
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/login", auth, async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken(); //generate token for this user
    res.status(201).send({ user: user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/signup", async (req, res) => {
  try {
    const user = await new User(req.body);
    const token = await user.generateAuthToken(); //generate token for this user
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  console.log("hi");
  try {
    console.log("in");
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token; //filtering out the current token
    });
    await req.user.save();
    res.status(201).send("done");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(201).send();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove(); //remove method is given by mongoose, it is remove+ auth
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
