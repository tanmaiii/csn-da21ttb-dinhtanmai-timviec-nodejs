import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";
import checkPassword from "../middlewares/checkPassword.middleware.js";
import nodemailer from "nodemailer";
import "express-async-errors";

export const register = (req, res) => {
  const { name, email, password, phone } = req.body;

  const q = "SELECT * FROM users WHERE email = ?";

  if (!name) return res.status(409).json("Tên không được để trống !");
  if (!email) return res.status(409).json("Email không được để trống !");
  if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ.");
  if (!phone || isNaN(phone) || phone?.length > 45)
    return res.status(409).json("Số điện thoại không hợp lệ !");

  if (name?.length > 255 || email?.length > 255 || password?.length > 255)
    return res.status(409).json("Các trường không vượt quá 255 kí tự !");

  if (!checkPassword(password))
    return res
      .status(403)
      .json(
        "Mật khẩu phải bao gồm ít nhất 6 kí tự, trong đó có chữ cái, số, chữ cái viết hoa và kí tự đặt biệt."
      );

  db.query(q, email, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data?.length) return res.status(409).json("Email đã tồn tại !");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users (`name`, `email`, `password`, `phone`) VALUE (?)";

    const values = [name, email, hashedPassword, phone];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Đăng ký thành công");
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM users WHERE email=?";

  if (email && password) {
    if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ.");

    db.query(q, email, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data?.length === 0) return res.status(404).json("Email không tồn tại.");

      const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
      if (!checkPassword) return res.status(401).json("Sai mật khẩu");

      const token = jwt.sign({ id: data[0].id }, process.env.MY_SECRET, { expiresIn: "7d" });
      const { password, ...others } = data[0];

      res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          expires: new Date(Date.now() + 900000),
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(others);
    });
  } else {
    res.status(409).json("Email và mật khẩu không được để rỗng!");
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("Đăng xuất thành công");
};

export const forgotPassword = (req, res) => {
  const { email } = req.body;

  const q = "SELECT email, name, id from users WHERE email = ?";

  if (!checkEmail(email)) return res.status(403).json("Email không hợp lệ !");

  db.query(q, [email], (err, data) => {
    if (!data?.length) {
      return res.status(403).json("Không tìm thấy email!");
    } else {
      const token = jwt.sign({ id: data[0].id }, process.env.MY_SECRET, { expiresIn: "180s" }); // token tồn tại trong 1 phút

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.MAIL_NAME}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        },
      });

      const url = `${process.env.URL_REACT}/tao-moi-mat-khau/${data[0].id}/${token}?type=nguoi-dung`;

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

  if (!id || !token || !password) return res.status(403).json("Không tìm thấy!");

  if (!checkPassword(password))
    return res
      .status(403)
      .json(
        "Mật khẩu phải bao gồm ít nhất 6 kí tự, trong đó có chữ cái, số, chữ cái viết hoa và kí tự đặt biệt."
      );

  if (password?.length > 255) return res.status(409).json("Các trường không vượt quá 255 kí tự !");

  const q = `UPDATE users SET password = ? WHERE users.id = ?`;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    if (err) {
      return res
        .status(401)
        .json("Liên kết không đúng hoặc đã quá hạn. Vui lòng xác nhận lại email.");
    } else {
      db.query(q, [hashedPassword, userInfo.id], (err, data) => {
        if (!err) return res.status(200).json("Cập nhật mật khẩu thành công!");
        return res.status(401).json("Lỗi!");
      });
    }
  });
};

export const changePassword = (req, res) => {
  const { passwordOld, password } = req.body;
  const id = req.params.id;
  const token = req.cookies?.accessToken;

  if (!id) return res.status(403).json("Không tìm thấy người dùng!");
  if (!token) return res.status(401).json("Chưa đăng nhập !");
  if (!checkPassword(password))
    return res
      .status(403)
      .json(
        "Mật khẩu phải bao gồm ít nhất 6 kí tự, trong đó có chữ cái, số, chữ cái viết hoa và kí tự đặt biệt."
      );

  if (password?.length > 255) return res.status(409).json("Các trường không vượt quá 255 kí tự!");

  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data?.length === 0) return res.status(404).json("Nguời dùng không tồn tại");

    const checkPasswordOld = bcrypt.compareSync(passwordOld, data[0].password);

    if (!checkPasswordOld) return res.status(401).json("Mật khẩu cũ không đúng !");

    const q2 = `UPDATE users SET password = ? WHERE users.id = ?`;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
      if (err) {
        return res.status(401).json("Lỗi!");
      } else {
        db.query(q2, [hashedPassword, userInfo.id], (err, data) => {
          if (!err) return res.status(200).json("Cập nhật mật khẩu thành công!");
          return res.status(401).json("Lỗi!");
        });
      }
    });
  });
};
