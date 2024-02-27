require('../config/DabaseConnection')
const User = require("../models/User");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

const matchPassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

export default async function login(req, res) {
  if (req.method === "POST") {

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (user && (await matchPassword(password, user.password))) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          username: user.username,
          pic: user.pic,
          token: generateToken(user._id),
          isAdmin: user.isAdmin,
          isOnBoarded: user.isOnBoarded,
          HighScore: user.HighScore
        });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

}
