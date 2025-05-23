import express from "express";
import { db } from "./config/connect.js";

import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";

import nodemailer from "nodemailer";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" assert { type: "json" };
import "express-async-errors";

import authUserRouter from "./routes/authUser.routes.js";
import authCompanyRouter from "./routes/authCompany.routes.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import fieldsRouter from "./routes/fields.routes.js";
import provinesRouter from "./routes/provinces.routes.js";
import followRouter from "./routes/follow.routes.js";
import saveRouter from "./routes/save.routes.js";
import applyRouter from "./routes/apply.routes.js";

import checkEmail from "./middlewares/checkEmail.middleware.js";
import checkImage from "./middlewares/checkImage.middleware.js";
import checkFile from "./middlewares/chechFile.middleware.js";



import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", true);
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: [process.env.URL_REACT, "https://jobquest.tanmai.id.vn", "https://jobquest-tm.vercel.app"],
  })
);

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/cv", express.static(path.join(__dirname, "/fileCv")));

dotenv.config();

app.use(cookieParser());
app.use(express.json());

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

const uploadFile = multer({
  storage: storageFile,
});

app.post("/api/uploadFile", uploadFile.single("file"), (req, res) => {
  // #swagger.tags = ['Lưu File']
  const file = req.file;
  if (!checkFile(file)) return res.status(404).json("Tệp quá lớn không thể lưu trữ !");
  res.status(200).json(file.filename);
});

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// routes
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

app.post("/api/signupEmail", (req, res) => {
  // #swagger.tags = ['Đăng ký danh sách gửi thư']
  const email = req.body.email || "";

  if (email) {
    if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ.");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.MAIL_NAME}`,
        pass: `${process.env.MAIL_PASSWORD}`,
      },
    });

    const emailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thông Báo Đăng Ký Nhận Email Mới từ Website</title>
    </head>
    <body>
      <p><strong>Chào ${email} ,</strong></p>
    
      <p>Chúc mừng! Bạn đã đăng ký thành công để nhận thông báo mới từ website của chúng tôi.</p>
    
      <p>Từ giờ, bạn sẽ nhận được các thông báo về tin tức, cập nhật, và những sự kiện quan trọng trực tiếp qua email của mình. Chúng tôi cam kết gửi cho bạn những thông tin hữu ích và đáng chú ý.</p>
    
      <p>Nếu có bất kỳ câu hỏi hoặc yêu cầu nào, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email <a href="mailto:${process.env.MAIL_NAME}">${process.env.MAIL_NAME}</a>. Chúng tôi luôn sẵn lòng hỗ trợ bạn.</p>
    
      <p>Cảm ơn bạn đã tham gia cộng đồng của chúng tôi. Chúng tôi rất mong muốn có cơ hội chia sẻ những tin tức thú vị với bạn.</p>
    
      <p><strong>Trân trọng,</strong></p>
      <p><em>JOBQUEST || <br>Đội ngũ Hỗ trợ Khách hàng</em></p>
    </body>
    </html>
    `;

    var mailOptions = {
      from: `${process.env.MAIL_NAME}`,
      to: `${email}`,
      subject: "JobQuest || Đăng ký tham gia danh sách nhận thông báo",
      html: emailHTML,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  } else {
    return res.status(409).json("Email rỗng !");
  }
});

app.get("/", (req, res) => {
  // #swagger.tags = []
  res.send("Hello this is api jobquest");
});

app.get("/api/mysql", (req, res) => {
  // #swagger.tags = []
  db.connect(function (err) {
    if (err) {
      res.status(403).json("Error connecting SQL");
      console.log("Error connecting SQL " + err.stack);
    } else {
      db.query("SHOW DATABASES;", function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    }
  });
});

db.connect(function (err) {
  if (err) {
    console.log("Error connecting SQL " + err.stack);
  } else {
    console.log("[Connect Mysql success]");
  }
});


// Hàm thực hiện truy vấn SQL để giữ kết nối sống
const pingDatabase = () => {
  db.query('SELECT 1', (error, results) => {
    if (error) {
      console.error('Error pinging the database:', error.message);
    } else {
      console.log('Database pinged successfully');
    }
  });
};

// Thực hiện ping cơ sở dữ liệu mỗi giờ 1 lần (3,600,000 milliseconds)
const pingInterval = setInterval(pingDatabase, 3600000);

process.on('exit', () => {
  clearInterval(pingInterval);
});


// Chạy ứng dụng
const PORT = process.env.PORT || 8800;

app.listen(PORT, (req, res) => {
  console.log(`[Server running with port ${PORT}]`);
});


