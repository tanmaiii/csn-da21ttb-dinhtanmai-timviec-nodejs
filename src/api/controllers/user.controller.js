import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";
import checkUrl from "../middlewares/checkUrl.middleware.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const getUser = (req, res) => {
  const id = req.params.id;
  const q = "SELECT id, name, phone, avatarPic, birthDay, intro, linkCv FROM users WHERE id=?";

  if (id) {
    db.query(q, id, (err, data) => {
      if (!data.length) {
        return res.status(401).json("Không tồn tại !");
      } else {
        return res.json(data[0]);
      }
    });
  } else {
    return res.status(401).json("Không có trường id !");
  }
};

export const getOwnerUser = (req, res) => {
  let q = `SELECT u.* , p.name as province FROM job.users as u
           LEFT JOIN job.provinces as p ON u.idProvince = p.id where u.id = ?`;

  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    db.query(q, userInfo.id, (err, data) => {
      if (!data?.length) {
        return res.status(401).json("Không tồn tại !");
      } else {
        const { password, ...others } = data[0];
        return res.json(others);
      }
    });
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { name, birthDay, sex, email, phone, idProvince, linkCv } = req.body;

  if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ !");
  if (linkCv?.length > 0 && !checkUrl(linkCv))
    return res.status(409).json("Link Cv không hợp lệ !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q =
      "UPDATE job.users SET `name`= ?, `email`= ?, `phone`= ?, `birthDay`= ?, `sex`= ? , `idProvince`= ?, `linkCv` = ? WHERE id = ? ";
    const values = [name, email, phone, new Date(birthDay), sex, idProvince, linkCv, userInfo.id];

    db.query(q, values, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const updateIntroUser = (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  console.log(req.body.intro);

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q = "UPDATE job.users SET `intro` = ? WHERE id = ? ";

    db.query(q, [req.body.intro, userInfo.id], (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const uploadImage = (req, res) => {
  const avatarPic = req.body.avatarPic;
  const q = "UPDATE users SET avatarPic = ? WHERE id = ? ";

  const token = req.cookies?.accessToken;
  if (!token) return res.status(403).json("Chưa đăng nhập !");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    db.query(q, [avatarPic, userInfo.id], (err, data) => {
      if (!err) return res.status(200).json("Lưu ảnh thành công !");
      return res.status(401).json("Lỗi!");
    });
  });
};

export const forgotPassword = (req, res) => {
  const { email } = req.body;

  const q = "SELECT email, id from job.users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (!data.length) {
      return res.status(403).json("Không tìm thấy email!");
    } else {
      const token = jwt.sign({ id: data[0].id }, "jwt_secret_key", { expiresIn: "1d" });

      console.log(process.env.MAIL_NAME, process.env.MAIL_PASSWORD);

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.MAIL_NAME}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        },
      });

      var mailOptions = {
        from: `${process.env.MAIL_NAME}`,
        to: `${data[0].email}`,
        subject: "Reset Password Link",
        text: `http://localhost:8800/reset_password/${data[0].id}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.send({ Status: "Success" });
        }
      });
      return res.status(200).json(data[0]);
    }
  });
};

export const resetPassword = (email, password, result) => {
  db.query("UPDATE users SET password = ? WHERE email=?", email, password, (err, res) => {
    if ((err, res)) {
      console.log("error", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    return result(null, { email: email });
  });
};
