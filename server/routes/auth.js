import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyEmail } from "../controllers/authComtroller.js";
import {
  handleRegistration,
  handleLogin,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", handleRegistration);
router.post("/login", handleLogin);
router.post("/email?", verifyEmail);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: "This is a protected route" });
});

export default router;
