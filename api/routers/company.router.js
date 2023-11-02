import express from "express";
import {
  getCompany,
  getAllCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.get("/find/:id", getCompany);
router.get("/", getAllCompany);
router.put("/", updateCompany);

export default router;
