import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../config/connect.js";
import checkEmail from "../../middlewares/checkEmail.middleware.js";

export const login = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM companies WHERE email=?";

  if (email && password) {
    if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ.");

    db.query(q, email, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Email không tồn tại");
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!checkPassword) return res.status(401).json("Sai mật khẩu");

      const token = jwt.sign({ id: data[0].id }, "secretkey");
      const { password, ...others } = data[0];

      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    });
  } else {
    return res.status(409).json("Các trường không để rỗng!");
  }
};