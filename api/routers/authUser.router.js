import express from "express";
import { register } from "../controllers/authUser/register.controllers.js";
import { login } from "../controllers/authUser/login.controllers.js";
import { logout } from "../controllers/authUser/logout.controllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;
