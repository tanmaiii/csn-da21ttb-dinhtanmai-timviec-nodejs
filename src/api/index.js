import express from "express";
import { db } from "./config/connect.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";

import authUserRouter from "./routes/authUser.router.js";
import authCompanyRouter from "./routes/authCompany.router.js";
import userRouter from "./routes/user.router.js";
import companyRouter from "./routes/company.router.js";
import jobRouter from "./routes/job.router.js";
import fieldsRouter from "./routes/fields.router.js";
import provinesRouter from "./routes/provinces.router.js";
import followRouter from "./routes/follow.router.js";
import saveRouter from "./routes/save.router.js";
import applyRouter from "./routes/apply.router.js";

import checkImage from "./middlewares/checkImage.middleware.js";

import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", true);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/cv", express.static(path.join(__dirname, "/fileCv")));

dotenv.config();

app.use(cookieParser());
app.use(express.json());

db.connect(function (err) {
  if (err) {
    console.log("Error connecting SQL " + err.stack);
  } else {
    console.log("Connecting mysql");
  }
});

// Multer image

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!checkImage(file)) return res.status(404).json("Ảnh không hợp lệ! Vui lòng gửi lại.");
  res.status(200).json(file.filename);
});

// Multer file cv

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "fileCv");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadFile = multer({ storage: storageFile });

app.post("/api/uploadFile", uploadFile.single("file"), (req, res) => {
  console.log(req.file);
  const file = req.file;
  res.status(200).json(file.filename);
});

// router

app.use("/api/authUser", authUserRouter);
app.use("/api/authCompany", authCompanyRouter);
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/fields", fieldsRouter);
app.use("/api/provinces", provinesRouter);
app.use("/api/follow", followRouter);
app.use("/api/save", saveRouter);
app.use("/api/apply", applyRouter);

app.listen(8800, (req, res) => {
  console.log("Backend running");
});
