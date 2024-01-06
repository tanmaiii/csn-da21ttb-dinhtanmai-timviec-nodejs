import express from "express";
import {register, login, logout, forgotPassword, resetPassword, changePassword} from '../controllers/authCompany.controller.js'

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/forgot", forgotPassword);
router.post("/resetPassword/:id/:token", resetPassword);
router.post("/changePassword/:id", changePassword);

export default router;
