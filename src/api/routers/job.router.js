import express from "express";
const router = express.Router();

import {
  getById,
  getByIdCompany,
  postJob,
  getAll,
  findJobs,
  getByIdField,
  getNameJob,
  updateJob,
} from "../controllers/job.controller.js";

//router.get("/find", findJobs)
router.get("/company/:id", getByIdCompany);
//router.get("/field/:idField", getByIdField)
router.get("/name/:id", getNameJob);
router.get("/:id", getById);
router.get("/", getAll);
router.post("/", postJob);
router.put("/", updateJob);

export default router;
