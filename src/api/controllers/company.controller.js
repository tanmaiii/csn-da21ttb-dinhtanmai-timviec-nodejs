import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import  checkEmail from '../middlewares/checkEmail.middleware.js'

export const getCompany = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT nameCompany, avatarPic, intro, scale, web, c.id, p.name as province FROM job.companies as c, job.provinces as p WHERE c.idProvince = p.id and c.id=?";
  if (id) {
    db.query(q, id, (err, data) => {
      if (!data.length) {
        return res.status(401).json("Không tồn tại !");
      } else {
        return res.json(data[0]);
      }
    });
  } else {
    return res.status(401).json("Không để rỗng !");
  }
};

export const getOwnerCompany = (req, res) => {
  const token = req.cookies?.accessToken;

  if (!token) return res.status(401).json("Not logged in!");

  const q = `SELECT c.* , p.name as province FROM job.companies as c
             LEFT JOIN job.provinces as p ON c.idProvince = p.id where c.id = ?`;

  jwt.verify(token, "secretkey", (err, userInfo) => {
    db.query(q, userInfo.id, (err, data) => {
      if (!data.length) {
        return res.status(401).json("Không tồn tại !");
      } else {
        const { password, ...others } = data[0];
        return res.json(others);
      }
    });
  });
};

export const getAllCompany = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM companies WHERE id=?";
  if (id) {
    db.query(q, id, (err, data) => {
      console.log(data);
      if (!data.length) {
        return res.status(401).json("Không tồn tại !");
      } else {
        const { password, ...others } = data[0];
        return res.json(others);
      }
    });
  } else {
    return res.status(401).json("Không để rỗng !");
  }
};

export const updateCompany = (req, res) => {
  const token = req.cookies?.accessToken;

  const { nameCompany, nameAdmin, email, phone, idProvince, web, scale } =
    req.body;
  if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ !");

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");

    const q =
      "UPDATE companies SET `nameCompany`= ?,`nameAdmin`= ?,  `email`= ?, `phone`= ?, `idProvince`= ?,`web` = ?, `scale`= ? WHERE id = ? ";

    const values = [
      nameCompany,
      nameAdmin,
      email,
      phone,
      idProvince,
      web,
      scale,
      userInfo.id
    ];

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
    const q = "UPDATE job.companies SET `intro` = ? WHERE id = ? ";

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

export const resetPassword = (email, password, result) => {
  db.query(
    "UPDATE companies SET password = ? WHERE email=?",
    email,
    password,
    (err, res) => {
      if ((err, res)) {
        console.log("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { email: email });
    }
  );
};
