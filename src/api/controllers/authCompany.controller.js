import bcrypt from "bcrypt";
import { db } from "../config/connect.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";
import "express-async-errors";
import checkPassword from "../middlewares/checkPassword.middleware.js";

export const register = (req, res) => {
  const { nameAdmin, nameCompany, email, password, phone, idProvince, scale } = req.body;

  const q = "SELECT * FROM companies WHERE email = ?";

  if (!email) return res.status(409).json("Email không được để rỗng!");
  if (!phone) return res.status(409).json("Số điện thoại không được để rỗng!");
  if (!nameCompany) return res.status(409).json("Tên công ty không được để rỗng!");
  if (!nameAdmin) return res.status(409).json("Tên người đại diện không được để rỗng!");
  if(!checkPassword(password)) return res.status(403).json("Mật khẩu phải có ít nhất 6 kí tự, có chữ, số, chữ cái viết hoa và kí tự đặt biệt ");

  if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ.");
  if(isNaN(phone))  return res.status(409).json("Số điện thoại không hợp lê !");

  db.query(q, email, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data?.length) return res.status(409).json("Email đã tồn tại !");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO companies (`nameAdmin`, `nameCompany`, `email`, `password`, `phone`, `idProvince`, `scale`) VALUE (?)";

    const values = [nameAdmin, nameCompany, email, hashedPassword, phone, idProvince, scale];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Đăng ký thành công");
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM companies WHERE email=?";

  if (email && password) {
    if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ.");

    db.query(q, email, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data?.length === 0) return res.status(404).json("Email không tồn tại");
      const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
      if (!checkPassword) return res.status(401).json("Sai mật khẩu");

      const token = jwt.sign({ id: data[0].id }, process.env.MY_SECRET, { expiresIn: "7d" });
      const { password, ...others } = data[0];

      res
        .cookie("accessToken", token, {
         // httpOnly: true,
          sameSite: "none",
          secure: true,
          expires: new Date(Date.now() + 900000),
          maxAge: 24 * 60 * 60 * 1000 
        })
        .status(200)
        .json(others);
    });
  } else {
    return res.status(409).json("Email và mật khẩu không được để rỗng!");
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
