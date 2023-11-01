import express from "express";
import {
  getCompany,
  getAllCompany,
  updateUser,
} from "../controllers/company.controller.js";

const router = express.Router();

router.get("/find/:id", getCompany);
router.get("/", getAllCompany);
router.put("/", updateUser);

export default router;
