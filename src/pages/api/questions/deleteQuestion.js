require("../config/DabaseConnection");
const User = require("../models/User");
const Question = require("../models/Question");

export default async function getAllQuestions(req, res) {
  if (req.method === "POST") {  
    try {
      const { userId, questionId } = req.body;
      const user = await User.findById(userId);
      if (!user || !user.isAdmin) {
        res.status(401).send("You are not authorized as an admin");
        return;
      }

      const questions = await Question.findByIdAndDelete(questionId);

      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  } else {
    res.status(405).send("Method Not Allowed"); 
  }
}
