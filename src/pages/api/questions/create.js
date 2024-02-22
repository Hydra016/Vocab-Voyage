require("../config/DabaseConnection");
const User = require("../models/User");
const Question = require("../models/Question");

export default async function create(req, res) {
  if (req.method === "POST") {
    try {
      const { answers, correctAnswer, pic, level, title, userId } = req.body;
      const user = await User.findById(userId);
      if (!user || !user.isAdmin) {
        res.status(401).send("You are not authorized as an admin");
        return;
      }

      const question = await Question.create({
        title,
        level,
        pic,
        answers,
        correctAnswer,
      });

      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  }
}
