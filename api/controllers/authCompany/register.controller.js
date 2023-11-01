import bcrypt from "bcrypt";
import { db } from "../../config/connect.js";

export const register = (req, res) => {
  const { nameAdmin, nameCompany, email, password, phone, address } = req.body;

  const q = "SELECT * FROM companies WHERE email = ?";


  if (!nameAdmin || !nameCompany || !email || !password || !phone || !address)
    return res.status(409).json("Các trường không để rỗng!");

  db.query(q, email, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email đã tồn tại !");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO companies (`nameAdmin`, `nameCompany`, `email`, `password`, `phone`, `address`) VALUE (?)";

    const values = [nameAdmin, nameCompany, email, hashedPassword, phone, address];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Đăng ký thành công");
    });
  });
};
