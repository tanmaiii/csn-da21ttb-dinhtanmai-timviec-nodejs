import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";
import checkUrl from "../middlewares/checkUrl.middleware.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
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
  const q = "UPDATE users, name SET avatarPic = ? WHERE id = ? ";

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

  const q = "SELECT email, name, id from job.users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (!data?.length) {
      return res.status(403).json("Không tìm thấy email!");
    } else {
      const token = jwt.sign({ id: data[0].id }, "jwt_secret_key", { expiresIn: 60 }); // token tồn tại trong 1 phút

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.MAIL_NAME}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        },
      });

      const url = `http://localhost:3000/tao-moi-mat-khau/${data[0].id}/${token}?type=nguoi-dung`;

      const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác Nhận Tài Khoản và Tạo Mật Khẩu Mới</title>
      </head>
      <body style="color:#000;font-size:16px">
        <p>Chào ${data[0].name || "Bạn"},</p>
      
        <p>Chúng tôi nhận được yêu cầu tạo mật khẩu mới cho tài khoản của bạn. Để tiếp tục quá trình này, bạn vui lòng xác nhận yêu cầu bằng cách nhấn vào liên kết dưới đây:</p>
      
        <p><a href="${url}" target="_blank">Liên kết xác nhận tài khoản</a></p>
      
        <p>Lưu ý rằng liên kết này chỉ tồn tại trong vòng 60 giây. Nếu bạn không thực hiện thao tác trong khoảng thời gian này, bạn sẽ cần yêu cầu lại quá trình tạo mật khẩu mới.</p>
      
        <p>Nếu bạn không phải là người yêu cầu thay đổi mật khẩu hoặc có bất kỳ câu hỏi nào khác, vui lòng liên hệ với chúng tôi ngay lập tức qua địa chỉ email <a href="mailto:jobquestofficial@gmail.com">jobquestofficial@gmail.com</a> của chúng tôi.</p>
      
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      
        <p>Trân trọng,<br>
        JOBQUEST<br>
        Đội ngũ Hỗ trợ Khách hàng</p>
      </body>
      </html>
      `;

      var mailOptions = {
        from: `${process.env.MAIL_NAME}`,
        to: `${data[0].email}`,
        subject: "JobQuest || Xác Nhận Tài Khoản và Tạo Mật Khẩu Mới",
        // text: emailText,
        html: emailHTML,
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

export const resetPassword = (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  console.log(id, token, password);

  if (!id || !token || !password) return res.status(403).json("Không tìm thấy!");

  const q = `UPDATE job.users SET password = ? WHERE users.id = ?`;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  jwt.verify(token, "jwt_secret_key", (err, userInfo) => {
    if (err) {
      return res.status(401).json("Lỗi!");
    } else {
      db.query(q, [hashedPassword, userInfo.id], (err, data) => {
        if (!err) return res.status(200).json("Cập nhật mật khẩu thành công!");
        return res.status(401).json("Lỗi!");
      });
    }
  });
};
