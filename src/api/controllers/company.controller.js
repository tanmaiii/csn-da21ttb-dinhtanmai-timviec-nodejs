import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";
import checkUrl from "../middlewares/checkUrl.middleware.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

export const getCompany = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT nameCompany, avatarPic, intro, scale, web, c.id, p.name as province FROM companies as c, provinces as p WHERE c.idProvince = p.id and c.id=?";
  if (id) {
    db.query(q, id, (err, data) => {
      if (!data?.length) return res.status(401).json("Không tồn tại !");
      return res.json(data[0]);
    });
  } else {
    return res.status(401).json("Không để rỗng !");
  }
};

export const getOwnerCompany = (req, res) => {
  const token = req.cookies?.accessToken;

  if (!token) return res.status(401).json("Not logged in!");

  const q = `SELECT c.* , p.name as province FROM companies as c
             LEFT JOIN provinces as p ON c.idProvince = p.id where c.id = ?`;

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

export const getAllCompany = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const { page, limit } = req.query;
    const search = req.query?.search;
    const province = req.query?.province;
    const scale = req.query?.scale;
    const offset = (page - 1) * limit;

    let q = `SELECT c.id, nameCompany, avatarPic, intro, scale, web, c.id, p.name as province 
                          FROM companies as c, provinces as p WHERE c.idProvince = p.id`;

    let q2 = `SELECT count(*) as count FROM companies as c, provinces as p WHERE c.idProvince = p.id `;

    if (search) {
      q += ` AND c.nameCompany like '%${search}%' `;
      q2 += ` AND c.nameCompany like '%${search}%' `;
    }

    if (province) {
      let provinceFilter = province.join("','");
      q += ` AND p.name in ('${provinceFilter}') `;
      q2 += ` AND p.name in ('${provinceFilter}') `;
    }

    if (scale) {
      let scaleFilter = scale.join("','");
      q += ` AND c.scale in ('${scaleFilter}') `;
      q2 += ` AND c.scale in ('${scaleFilter}') `;
    }

    const [data] = await promiseDb.query(`${q} limit ? offset ?`, [+limit, +offset]);

    const [totalPageData] = await promiseDb.query(q2);

    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

    if (data && totalPageData && totalPage) {
      return res.status(200).json({
        data: data,
        pagination: {
          page: +page,
          limit: +limit,
          totalPage,
        },
      });
    } else {
      return res.status(200).json("Rỗng !");
    }
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
};

export const updateCompany = (req, res) => {
  const token = req.cookies?.accessToken;

  const { nameCompany, nameAdmin, email, phone, idProvince, web, scale } = req.body;
  if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ !");
  if (web?.length > 0 && !checkUrl(web)) return res.status(409).json("Link không hợp lệ !");

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");

    const q =
      "UPDATE companies SET `nameCompany`= ?,`nameAdmin`= ?,  `email`= ?, `phone`= ?, `idProvince`= ?,`web` = ?, `scale`= ? WHERE id = ? ";

    const values = [nameCompany, nameAdmin, email, phone, idProvince, web, scale, userInfo.id];

    db.query(q, values, (err, data) => {
      if (!err) return res.status(200).json(err);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const updateIntroCompany = (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q = "UPDATE companies SET `intro` = ? WHERE id = ? ";

    db.query(q, [req.body.intro, userInfo.id], (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const uploadImage = (req, res) => {
  const avatarPic = req.body.avatarPic;
  const q = "UPDATE companies SET avatarPic = ? WHERE id = ? ";

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

  const q = "SELECT email, nameAdmin, id from companies WHERE email = ?";

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

      const url = `http://localhost:3000/tao-moi-mat-khau/${data[0].id}/${token}?type=nha-tuyen-dung`;

      const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác Nhận Tài Khoản và Tạo Mật Khẩu Mới</title>
      </head>
      <body style="color:#000;font-size:16px">
        <p>Chào nhà tuyển dụng, ${data[0].nameAdmin || "Bạn"},</p>
      
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

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
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

  const q = `UPDATE companies SET password = ? WHERE companies.id = ?`;
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
