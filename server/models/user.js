import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSachema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timeStamp: true }
);

userSachema.pre("save", async function (next) {
  // console.log("current pasword is ", this.password);
  this.password = await bcrypt.hash(this.password, 10);
  // console.log("current pasword is ", this.password);
  next();
});

export const User = mongoose.model("user", userSachema);
