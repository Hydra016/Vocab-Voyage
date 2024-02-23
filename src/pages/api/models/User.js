const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    username: { type: "String", unique: true, required: true, unique: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    },
    isOnBoarded: {
      type: Boolean,
      default: false
    }
  },
  { timestaps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
