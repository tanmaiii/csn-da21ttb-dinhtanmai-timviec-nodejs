import bcrypt from "bcrypt";
import { db } from "../../config/connect.js";
import checkEmail from "../../middlewares/checkEmail.middleware.js";

export const register = (req, res) => {
  const { name, email, password, phone } = req.body;

  const q = "SELECT * FROM users WHERE email = ?";

    if (!name) return res.status(409).json("Tên không được để trống !");
    if (!email) return res.status(409).json("Email không được để trống !");
    if (!password) return res.status(409).json("Mật khẩu không được để trống !");
    if(password.length < 6) return res.status(409).json("Mật khẩu phải lớn hơn 6 kí tự !");

    if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ.");
    if(isNaN(phone))  return res.status(409).json("Số điện thoại không hợp lê !");

  db.query(q, email, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data?.length) return res.status(409).json("Email đã tồn tại !");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users (`name`, `email`, `password`, `phone`) VALUE (?)";

    const values = [name, email, hashedPassword, phone];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Đăng ký thành công");
    });
  });
};
