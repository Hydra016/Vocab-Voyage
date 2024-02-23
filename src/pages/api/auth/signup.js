require('../config/DabaseConnection')
const User = require("../models/User");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");


export default async function signup(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { name, username, password, pic } = req.body;
    if (!name || !username || !password) {
      res.status(400).json({ error: "Please enter all fields" });
      return;
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    let newPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      password: newPass,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        pic: user.pic,
        token: generateToken(user._id),
        isOnBoarded: false
      });
    } else {
      res.status(400).json({ error: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
