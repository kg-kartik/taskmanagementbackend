import express from "express";
import { login, signup } from "../controllers/Admin";
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);

export default router;