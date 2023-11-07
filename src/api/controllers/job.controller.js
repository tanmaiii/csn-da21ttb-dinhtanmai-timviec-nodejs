import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getById = (req, res) => {};

export const getAll = (req, res) => {
  const q = "SELECT * FROM job.jobs";

  db.query(q, (err, data) => {
    if (!data.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};

export const postJob = (req, res) => {
  const {
    idField,
    idProvince,
    nameJob,
    request,
    desc,
    other,
    salaryMin,
    salaryMax,
    sex,
    typeWork,
    level,
    experience,
  } = req.body;

  console.log(req.body);

  if (!idField || !idProvince || !nameJob)
    return res.status(401).json("Các trường không để rỗng !");

  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  const q = "SELECT * FROM companies WHERE id = ?";

  jwt.verify(token, "secretkey", (err, companmyInfo) => {
    db.query(q, companmyInfo.id, (err, data) => {
      if (!data?.length)
        return res.status(401).json("Người dùng không hợp lệ !");

      const q =
        "INSERT INTO jobs (`idCompany`, `idField`, `idProvince` , `nameJob`, `request`, `desc`, `other`, `salaryMin`, `salaryMax`,`sex`, `typeWork` , `level`, `experience`,  `createdAt`) VALUE (?)";
      const values = [
        companmyInfo.id,
        idField,
        idProvince,
        nameJob,
        request,
        desc,
        other,
        salaryMin,
        salaryMax,
        sex,
        typeWork,
        level,
        experience,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Đăng thành công");
      });
    });
  });
};

// {
//   "idField": 1,
//   "idProvince": 1,
//   "nameJob": "1",
//   "request": "1",
//   "desc": "1",
//   "other": "1",
//   "salaryMin": "1",
//   "salaryMax": "1",
//   "sex": "1"
// }
