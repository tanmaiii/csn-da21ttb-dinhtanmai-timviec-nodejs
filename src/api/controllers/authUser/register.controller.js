import bcrypt from "bcrypt";
import { db } from "../../config/connect.js";
import checkEmail from "../../middlewares/checkEmail.middleware.js";

export const register = (req, res) => {
  const { name, email, password, phone } = req.body;

  const q = "SELECT * FROM users WHERE email = ?";

  if (!name || !email || !password || !phone)
    return res.status(409).json("Các trường không để rỗng !");

  if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ !");

  db.query(q, email, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data?.length) return res.status(409).json("Email đã tồn tại !");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO users (`name`, `email`, `password`, `phone`) VALUE (?)";

    const values = [name, email, hashedPassword, phone];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Đăng ký thành công");
    });
  });
};
