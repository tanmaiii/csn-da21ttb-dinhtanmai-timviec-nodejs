import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res) => {

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, req.body.email, async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0)
      return res.status(409).json("Email không tồn tại !");

    const checkPassword = bcrypt.compareSync(req.body.password, result[0].password);

    if (!checkPassword) return res.status(401).json("Sai mật khẩu");

    const token = jwt.sign({ id: result[0].id }, "secretkey");

    const { password, ...others } = result[0];

    res
      .cookie("accessToken", token, {
        https: true,
      })
      .status(200)
      .json(others);
  });
};

export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, email, async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json("Email đã tồn tại !");

    const hashedPassword = bcrypt.hashSync(password, 10);

    // lưu người dùng vào csdl
    await db.execute(
      "insert into users (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, phone]
    );

    res.json({ message: "Người dùng đăng ký thành công" });
  });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken" , {
        secure: true,
        sameSite: 'none',
    }).status(200).json("Đăng xuất thành công");
};
