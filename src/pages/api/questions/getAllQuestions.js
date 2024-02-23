require("../config/DabaseConnection");
const User = require("../models/User");
const Question = require("../models/Question");

export default async function getAllQuestions(req, res) {
  if (req.method === "GET") {  
    try {
      const questions = await Question.find();

      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  } else {
    res.status(405).send("Method Not Allowed"); 
  }
}
