import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const secret_key = "78965412hjyf";

export const verifyEmail = async (req, res) => {
  const token = req.query.token;
  console.log("token in verify", token);

  if (!token) {
    return res.status(400).json({ msg: "Invalid or missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret_key);
    const userId = decoded.user.id;

    // Find the user and update their verification status
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: "User is already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully!" });
  } catch (err) {
    console.error("Email verification error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
