import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";

export const getUser = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT id, name, phone, avatarPic, birthDay, intro, cv FROM users WHERE id=?";

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
  const q = "SELECT * FROM users WHERE id=?";

  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

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

export const updateUser = (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { name, birthDay, email, phone, idProvince, cv } = req.body;

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q =
      "UPDATE job.users SET `name`= ?, `email`= ?, `phone`= ?, `birthDay`= ? , `idProvince`= ?, `cv` = ? WHERE id = ? ";
    const values = [name, email, phone, birthDay, idProvince, cv, userInfo.id];

    db.query(q, values, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

// {
//   "name": "tanmai update",
//   "birthDay": "11-11-111",
//   "email": "update@g.com",
//   "phone": "123",
//   "idProvince": 1,
//   "cv": "update@g.com"
// }

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

export const resetPassword = (email, password, result) => {
  db.query(
    "UPDATE users SET password = ? WHERE email=?",
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
