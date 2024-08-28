import { log } from "console";
import { User } from "../model/User.js";
import { generateToken } from "./auth.js";
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

    await user.save();
    // console.log(
    //   "User saved, password should now be hashed in the database.",
    //   password
    // );

    res.status(201).send(`${user.name} is registered`);
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).send("Server error");
  }
};
