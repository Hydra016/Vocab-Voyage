require("../config/DabaseConnection");
const User = require("../models/User");

export default async function getUser(req, res) {
  if (req.method === "POST") {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const foundUser = await User.findById(userId);

      res.status(200).json(foundUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
