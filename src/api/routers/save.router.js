import express from "express";

const router = express.Router();

import { getJobSave } from '../controllers/save.controller.js'
 
router.get("/:idUser", getJobSave);

export default router;
