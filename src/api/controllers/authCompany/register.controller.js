import bcrypt from "bcrypt";
import { db } from "../../config/connect.js";
import checkEmail from "../../middlewares/checkEmail.middleware.js";
import "express-async-errors";

export const register = (req, res) => {
  const { nameAdmin, nameCompany, email, password, phone, idProvince, scale } = req.body;

  const q = "SELECT * FROM companies WHERE email = ?";

  if (!email) return res.status(409).json("Email không được để rỗng!");
  if (!phone) return res.status(409).json("Số điện thoại không được để rỗng!");
  if (!nameCompany) return res.status(409).json("Tên công ty không được để rỗng!");
  if (!nameAdmin) return res.status(409).json("Tên người đại diện không được để rỗng!");
  if(password.length < 6) return res.status(409).json("Mật khẩu phải lớn hơn 6 kí tự !");

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
