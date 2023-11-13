import express from "express";

const router = express.Router();

import { getJobSave,getUser,  addSave, removeSave } from '../controllers/save.controller.js'
 
router.get("/user/", getUser);
router.get("/", getJobSave);
router.post("/", addSave);
router.delete("/", removeSave);

export default router;
