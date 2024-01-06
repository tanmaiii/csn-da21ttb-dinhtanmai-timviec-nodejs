import express from "express";
import {
  getUser,
  updateUser,
  getOwnerUser,
  updateIntroUser,
  uploadImage,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/find/:id", getUser);
router.get("/owner", getOwnerUser);
router.put("/update", updateUser); 
router.put("/updateIntro", updateIntroUser); 
router.put("/uploadImage", uploadImage);

export default router;



