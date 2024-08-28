import { User } from "../model/User.js";
import { generateToken } from "./auth.js";
import bcrypt from "bcryptjs";

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("req", req.body);

  try {
    // Correctly finding a single user
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials email" });
    }
    // Correct password comparison
    // console.log("user password", password);
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("ismatch", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials pasword" });
    }

    // Generate token
    const token = await generateToken(user);
    // console.log("token", token); // Debugging log for token

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
};
