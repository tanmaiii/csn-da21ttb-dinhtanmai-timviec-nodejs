import express from "express";
const router = express.Router();

import { getById } from "../controllers/post.controller.js";

router.get("/:id", getById);

export default router;
