import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";

export const getCompany = (req, res) => {
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

export const updateUser = (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");

    if (!req.body.id) return res.status(401).json("Thiếu trường id");

    const q =
      "UPDATE companies SET `nameCompany`= ?,`nameAdmin`= ?,  `email`= ?, `phone`= ?, `address`= ?,  `intro`= ? , `scale`=? WHERE id = ? ";
    const values = [
      req.body.nameCompany,
      req.body.nameAdmin,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.body.intro,
      req.body.scale,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (!err) return res.status(200).json(err);
      if (data.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thanh đổi được thông tin của mình");
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
