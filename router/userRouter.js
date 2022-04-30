const express = require("express");
const socialModel = require("../model/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const hSalt = await bcrypt.genSalt(10);
  const hPass = await bcrypt.hash(req.body.password, hSalt);
  try {
    const registerUser = await socialModel.create({
      name: req.body.name,
      emailAddress: req.body.emailAddress,
      password: hPass,
    });
    res.status(200).json({ message: "user is registered", data: registerUser });
  } catch (error) {
    res.status(400).json({ message: "Can't do this operation" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const findUser = await socialModel.findOne({
      emailAddress: req.body.emailAddress,
    });

    if (findUser) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        findUser.password
      );
      if (checkPassword) {
        const token = jwt.sign(
          {
            emailAddress: findUser.emailAddress,
          },
          "THiSTheBEstsecreTKEYEver",
          { expiresIn: "1d" }
        );

        const { password, ...data } = findUser._doc;

        res
          .status(201)
          .json({ message: "user created", data: { ...data, token } });
      } else {
        res.status(400).json({ message: "password isn't correcct" });
      }
    } else {
      res.status(400).json({ message: "user does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: "can't do this operation" });
  }
});
router.get("/allusers", async (req, res) => {
  try {
    const getData = await socialModel.find();
    res.status(200).json({
      message: "Access granted",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      message: "could get any users",
      data: error,
    });
  }
});

router.get("/getProfile/:id", async (req, res) => {
  try {
    const getData = await socialModel.findById(req.params.id, req.body);
    res.status(200).json({
      message: "Access granted",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      message: "could get a particular user",
      data: error,
    });
  }
});

module.exports = router;
