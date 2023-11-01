import express from "express";
import { register } from "../controllers/authCompany/register.controller.js";
import { login } from "../controllers/authCompany/login.controller.js";
import { logout } from "../controllers/authCompany/logout.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;
