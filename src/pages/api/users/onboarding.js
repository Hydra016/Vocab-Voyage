require("../config/DabaseConnection");
const User = require("../models/User");

export default async function onboarding(req, res) {
  if (req.method === "PUT") {
    try {
      const { userId, isOnBoarded } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const newUser = await User.findByIdAndUpdate(
        userId,
        {
          isOnBoarded: isOnBoarded,
        },
        { new: true }
      );

      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
