import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Api JobQuest",
    version: "1.0.0",
  },
  host: "localhost:8800", // Thay đổi địa chỉ host của bạn
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"]; // Thay đổi đường dẫn của file routes của bạn

swaggerAutogen()(outputFile, endpointsFiles, doc);
