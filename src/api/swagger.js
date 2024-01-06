import { db } from "../config/connect.js";

export const getById = (req, res) => {
  const q = "SELECT * FROM jobs WHERE id = ?";

  db.query(q, req.params.id, (err, data) => {
    if (err) res.status(404).json({ message: "Job not found" });
    return res.status(200).json(data[0]);
  });
};



import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "Api JobQuest",
    version: "1.0.0",
  },
  host: process.env.API_URL, // Thay đổi địa chỉ host của bạn
  basePath: "/",
  schemes: ["https", "http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"]; // Thay đổi đường dẫn của file routes của bạn

swaggerAutogen()(outputFile, endpointsFiles, doc);

// chạy filw swagger.js
// node ./swagger.js
