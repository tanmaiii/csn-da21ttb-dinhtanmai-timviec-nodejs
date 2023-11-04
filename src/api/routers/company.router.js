import express from "express";
import {
  getCompany,
  getOwnerCompany,
  getAllCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.get("/find/:id", getCompany);
router.get("/owner/:id", getOwnerCompany)
router.get("/", getAllCompany);
router.put("/", updateCompany);

export default router;
