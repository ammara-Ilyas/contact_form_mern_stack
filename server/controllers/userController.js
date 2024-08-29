import { User } from "../models/user.js";
import { generateToken } from "../utils/token.js";
import { sendVerificationEmail } from "../utils/email.js";
import bcrypt from "bcryptjs";

export const handleRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("req registration", req.body);

  try {
    let RegisteredUser = await User.findOne({ email });
    if (RegisteredUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // console.log("Plain text password before hashing:", password);
    const user = new User({ name, email, password });
    // console.log("User instance created, password still plain text:", password);

    console.log("ok 1");
    const token = await generateToken(user);
    const result = await sendVerificationEmail(user, token);
    await user.save();

    console.log("ok 2");
    res.status(201).send({
      msg: `${user.name} is registered. Please verify your email.`,
      html: result.html,
      verificationUrl: result.verificationUrl,
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).send("Server error");
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("req", req.body);

  try {
    // Correctly finding a single user
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials email" });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        msg: "Email is not verified. Please check your inbox for the verification email.",
      });
    }

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
