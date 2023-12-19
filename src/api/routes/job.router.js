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
  hiddenJob,
  unHiddenJob,
  deleteJob
} from "../controllers/job.controller.js";

router.get("/find", findJobs);
router.get("/company/:id", getByIdCompany);
router.get("/field/:idField", getByIdField);
router.get("/name/:id", getNameJob);
router.get("/:id", getById);
router.get("/", getAll);
router.post("/", postJob);
router.put("/", updateJob);
router.put("/hidden", hiddenJob);
router.put("/unHidden", unHiddenJob);
router.delete("/", deleteJob);

export default router;
