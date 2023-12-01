import express from "express";
import {
  getUser,
  updateUser,
  getOwnerUser,
  updateIntroUser,
  uploadImage,
  forgotPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/find/:id", getUser);
router.get("/owner", getOwnerUser);
router.put("/update", updateUser); //localhost:8800/api/user/update
router.put("/updateIntro", updateIntroUser); //localhost:8800/api/user/updateIntro
router.put("/uploadImage", uploadImage); //localhost:8800/api/user/updateIntro
router.post("/forgot", forgotPassword);

export default router;
