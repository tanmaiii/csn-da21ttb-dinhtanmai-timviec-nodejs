import express from "express";
import { register } from "../controllers/authUser/register.controller.js";
import { login } from "../controllers/authUser/login.controller.js";
import { logout } from "../controllers/authUser/logout.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;
