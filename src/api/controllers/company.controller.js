import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";
import checkUrl from "../middlewares/checkUrl.middleware.js";
import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();

export const getCompany = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT nameCompany, avatarPic, intro, scale, web, c.id, p.name as province FROM companies as c, provinces as p WHERE c.idProvince = p.id and c.id=?";
  if (id) {
    db.query(q, id, (err, data) => {
      if (!data?.length) return res.status(401).json("Không tồn tại !");
      return res.json(data[0]);
    });
  } else {
    return res.status(401).json("Không để rỗng !");
  }
};

export const getOwnerCompany = (req, res) => {
  const token = req.cookies?.accessToken;

  if (!token) return res.status(401).json("Not logged in!");

  const q = `SELECT c.* , p.name as province FROM companies as c
             LEFT JOIN provinces as p ON c.idProvince = p.id where c.id = ?`;

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    db.query(q, userInfo.id, (err, data) => {
      if (!data?.length) {
        return res.json(null);
      } else {
        const { password, ...others } = data[0];
        return res.json(others);
      }
    });
  });
};

export const getAllCompany = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const { page, limit } = req.query;
    const search = req.query?.search;
    const province = req.query?.province;
    const scale = req.query?.scale;
    const offset = (page - 1) * limit;

    let q = `SELECT c.id, nameCompany, avatarPic, intro, scale, web, c.id, p.name as province 
                          FROM companies as c, provinces as p WHERE c.idProvince = p.id`;

    let q2 = `SELECT count(*) as count FROM companies as c, provinces as p WHERE c.idProvince = p.id `;

    if (search) {
      q += ` AND c.nameCompany like '%${search}%' `;
      q2 += ` AND c.nameCompany like '%${search}%' `;
    }

    if (province) {
      let provinceFilter = province.join("','");
      q += ` AND p.name in ('${provinceFilter}') `;
      q2 += ` AND p.name in ('${provinceFilter}') `;
    }

    if (scale) {
      let scaleFilter = scale.join("','");
      q += ` AND c.scale in ('${scaleFilter}') `;
      q2 += ` AND c.scale in ('${scaleFilter}') `;
    }

    const [data] = await promiseDb.query(`${q} limit ? offset ?`, [+limit, +offset]);

    const [totalPageData] = await promiseDb.query(q2);

    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

    if (data && totalPageData && totalPage) {
      return res.status(200).json({
        data: data,
        pagination: {
          page: +page,
          limit: +limit,
          totalPage,
        },
      });
    } else {
      return res.status(200).json("Rỗng !");
    }
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
};

export const updateCompany = (req, res) => {
  const token = req.cookies?.accessToken;

  const { nameCompany, nameAdmin, email, phone, idProvince, web, scale } = req.body;
  if (!checkEmail(email)) return res.status(409).json("Email không hợp lệ !");
  if(isNaN(phone))  return res.status(409).json("Số điện thoại không hợp lê !");
  
  if (web?.length > 0 && !checkUrl(web)) return res.status(409).json("Link không hợp lệ !");

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");

    const q =
      "UPDATE companies SET `nameCompany`= ?,`nameAdmin`= ?,  `email`= ?, `phone`= ?, `idProvince`= ?,`web` = ?, `scale`= ? WHERE id = ? ";

    const values = [nameCompany, nameAdmin, email, phone, idProvince, web, scale, userInfo.id];

    db.query(q, values, (err, data) => {
      if (!err) return res.status(200).json(err);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const updateIntroCompany = (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q = "UPDATE companies SET `intro` = ? WHERE id = ? ";

    db.query(q, [req.body.intro, userInfo.id], (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const uploadImage = (req, res) => {
  const avatarPic = req.body.avatarPic;
  const q = "UPDATE companies SET avatarPic = ? WHERE id = ? ";

  const token = req.cookies?.accessToken;
  if (!token) return res.status(403).json("Chưa đăng nhập !");
  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    db.query(q, [avatarPic, userInfo.id], (err, data) => {
      if (!err) return res.status(200).json("Lưu ảnh thành công !");
      return res.status(401).json("Lỗi!");
    });
  });
};
