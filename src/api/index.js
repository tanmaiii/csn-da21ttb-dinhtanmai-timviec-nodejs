import express from "express";
import { db } from "./config/connect.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerFile from "./swagger-output.json" assert { type: "json" };

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
  // #swagger.tags = ['Lưu hình']
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
  // #swagger.tags = ['Lưu File']
  console.log(req.file);
  const file = req.file;
  res.status(200).json(file.filename);
});

// swagger
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Express API with Swagger",
//       version: "1.0.0",
//     },
//   },
//   apis: ["./routes/*.js", "./schema/*.js"],
// };

// const specs = swaggerJsdoc(options);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// router

app.use(
  "/api/authUser",

  // #swagger.tags = ['Xác thực người tìm việc'],
  authUserRouter
);
app.use(
  "/api/authCompany",
  // #swagger.tags = ['Xác thực nhà tuyển dụng']
  authCompanyRouter
);
app.use(
  "/api/user",
  // #swagger.tags = ['Người tìm việc']
  userRouter
);
app.use(
  "/api/company",
  // #swagger.tags = ['Nhà tuyển dụng']
  companyRouter
);
app.use(
  "/api/job",
  // #swagger.tags = ['Công việc']
  jobRouter
);
app.use(
  "/api/fields",
  // #swagger.tags = ['Ngành nghề']
  fieldsRouter
);
app.use(
  "/api/provinces",
  // #swagger.tags = ['Tỉnh']
  provinesRouter
);
app.use(
  "/api/follow",
  // #swagger.tags = ['Theo dõi công ty']
  followRouter
);
app.use(
  "/api/save",
  // #swagger.tags = ['Lưu công việc']
  saveRouter
);
app.use(
  "/api/apply",
  // #swagger.tags = ['Ứng tuyển']
  applyRouter
);

app.get("/", (req, res) => {
  // #swagger.tags = []
  return res.status(200).json("Hello express");
});

app.listen(8800, (req, res) => {
  console.log("Backend running");
});
