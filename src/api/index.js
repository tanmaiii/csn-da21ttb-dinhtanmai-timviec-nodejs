import express from "express";
import { db } from "./config/connect.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors'

import authUserRouter from "./routers/authUser.router.js";
import authCompanyRouter from "./routers/authCompany.router.js";
import userRouter from "./routers/user.router.js";
import companyRouter from "./routers/company.router.js";
import postRouter from "./routers/post.router.js";
const app = express();

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

app.use("/api/authUser", authUserRouter);
app.use("/api/authCompany", authCompanyRouter);
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("api/post", postRouter);

app.listen(8800, (req, res) => {
  console.log("Backend running");
});
