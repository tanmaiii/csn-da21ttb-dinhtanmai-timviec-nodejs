import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import moment from "moment";
import "express-async-errors";

export const getJobSave = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const idUser = req.query.idUser;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const offset = (page - 1) * limit;

    const q = `SELECT j.id,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany, j.createdAt , p.name as province , c.nameCompany, c.avatarPic, f.name as nameFields 
               FROM save_job as s , jobs as j , companies AS c ,  provinces as p , fields as f 
               WHERE s.idUser = ? AND s.idJob = j.id AND  j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id order by s.createdAt desc limit ? offset ?`;

    const q2 = `SELECT count(*) as count 
                FROM save_job as s , jobs as j , companies AS c , provinces as p , fields as f 
                WHERE s.idUser = ? AND s.idJob = j.id AND  j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id`;

    const [data] = await promiseDb.query(q, [idUser, +limit, +offset]);
    const [total] = await promiseDb.query(q2, idUser);
    const totalPage = Math.ceil(+total[0]?.count / limit);

    if (data && total && limit && page) {
      return res.status(200).json({
        data: data,
        pagination: {
          page: +page,
          limit: +limit,
          totalPage,
          total: total[0]?.count,
        },
      });
    } else {
      return res.status(409).json("Rỗng !");
    }
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
};

export const getUser = async (req, res) => {
  try {
    const q = "SELECT idUser FROM save_job as s WHERE s.idJob = ?";

    db.query(q, [req.query.idJob], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((user) => user.idUser));
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const addSave = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not invalid");

    const q =
      "INSERT INTO save_job (`idUser`, `idJob`, `createdAt`) VALUES (?)";

    const values = [
      userInfo.id,
      req.query.idJob,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thành công!");
    });
  });
};

export const removeSave = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not invalid");

    const q = "DELETE FROM save_job WHERE `idUser` = ? AND `idJob` = ?";

    db.query(q, [userInfo.id, req.query.idJob], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thành công!");
    });
  });
};
