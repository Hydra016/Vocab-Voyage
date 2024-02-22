const mongoose = require("mongoose");

const levelSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestaps: true }
);

const Level = mongoose.models.Level || mongoose.model('Level', levelSchema);

module.exports = Level;
