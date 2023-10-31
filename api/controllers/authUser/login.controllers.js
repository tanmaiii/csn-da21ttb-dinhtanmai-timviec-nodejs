import User from "../../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    User.findByEmail(email, (err, user) => {
      if (!user) {
        return res.status(409).json(email + "Không tồn tại");
      } else {
        const checkPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!checkPassword) return res.status(401).json("Sai mật khẩu");
        const token = jwt.sign({ id: user.id }, "secretkey");

        const { password, ...others } = user;

        res
          .cookie("accessToken", token, {
            https: true,
          })
          .status(200)
          .json(others);
      }
    });
  } else {
    res.status(409).json("Các trường không để rỗng!");
  }
};
