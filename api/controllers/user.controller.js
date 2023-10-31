import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const id = req.params.id;
  if (id) {
    User.findById(id, (err, user) => {
      if (!user) {
        return res.json("Không tồn tại !");
      } else {
        const { password, ...others } = user;
        return res.json(others);
      }
    });
  }
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");
  console.log(token);

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token không trùng !");
  //
  // });

  // if (!req.body.id) return res.status(401).json("Thiếu trường id");

  // User.update(req.body, (err, user) => {
  //   if (!err) {
  //     console.log(user);
  //     res.status(200).json(user);
  //   }
  // });
};
