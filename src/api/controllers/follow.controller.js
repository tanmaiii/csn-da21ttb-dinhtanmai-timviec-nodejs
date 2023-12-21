import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import moment from "moment";

export const getCompanies = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const idUser = req.params.idUser;
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const q = `SELECT nameCompany, avatarPic, scale, web, c.id, p.name as province 
              FROM follow_company AS f, companies AS c, provinces as p 
              WHERE f.idUser = ? AND f.idCompany = c.id AND c.idProvince = p.id order by f.createdAt desc limit ? offset ?`;

    const q2 = `SELECT count(*) as count FROM follow_company AS f, companies AS c 
                WHERE f.idUser = ? AND f.idCompany = c.id`;

    const [data] = await promiseDb.query(q, [idUser, +limit, +offset]);
    const [totalPageData] = await promiseDb.query(q2, idUser);
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

    if (data) {
      return res.status(200).json({
        data: data,
        pagination: {
          page: +page,
          limit: +limit,
          totalPage,
        },
      });
    } else {
      return res.status(409).json("Rỗng !");
    }
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
};

export const getFollower = (req, res) => {
  try {
    const q = "SELECT idUser FROM follow_company as f WHERE f.idCompany = ?";

    db.query(q, [req.query.idCompany], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((user) => user.idUser));
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const addFollow = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not invalid");

    const q = "INSERT INTO follow_company (`idUser`, `idCompany`, `createdAt`) VALUES (?)";
    const values = [
      userInfo.id,
      req.query.idCompany,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thành công!");
    });
  });
};

export const removeFollow = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not invalid");

    const q = "DELETE FROM follow_company WHERE `idUser` = ? AND `idCompany` = ?";

    db.query(q, [userInfo.id, req.query.idCompany], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thành công!");
    });
  });
};
