const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hello from router ");
});

router.get("/signup", (req, res) => {
  res.send("hello from router ");
});

router.post("/signup", (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill the reqired details" });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "email aready exist" });
      } else if (password != cpassword) {
        return res.status(422).json({ error: "password are not matching" });
      } else {
        const user = new User({ name, email, phone, password, cpassword });

        // password hashing

        user
          .save()
          .then(() => {
            res.status(201).json({ message: "user registered successfully" });
          })
          .catch((err) => {
            res.status(500).json({ error: "failt to registerd" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/login", (req, res) => {
  res.send("log in page");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz fill the reqired details" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.json({ message: "user sign in succeffdully" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", authenticate, (req, res) => {
  console.log("about page");
  res.send(req.rootUser);
});

module.exports = router;
  