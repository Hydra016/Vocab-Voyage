const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    title: { type: "String", required: true },
    level: {
      type: "String",
      default: "beginner"
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    answers: {
        type: ["String"],
        required: true
    },
    correctAnswer: {
        type: "String",
        required: true
    }
  },
  { timestaps: true }
);

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

module.exports = Question;
