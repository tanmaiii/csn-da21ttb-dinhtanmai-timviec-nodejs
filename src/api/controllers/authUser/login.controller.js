import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../config/connect.js";
import checkEmail from "../../middlewares/checkEmail.middleware.js";
import "express-async-errors";

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
        })
        .status(200)
        .json(others);
    });
  } else {
    res.status(409).json("Email và mật khẩu không được để rỗng!");
  }
};
