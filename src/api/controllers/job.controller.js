import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getAll = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const q = `SELECT j.id,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany, j.createdAt , p.name as province , c.nameCompany, c.avatarPic
               FROM job.jobs AS j , job.companies AS c ,  job.provinces as p 
               WHERE j.idCompany = c.id AND j.idProvince = p.id ORDER BY j.createdAt DESC limit ? offset ?`;

    const q2 = `SELECT count(*) as count FROM job.jobs AS j , job.companies AS c , job.provinces as p 
                WHERE j.idCompany = c.id AND j.idProvince = p.id`;

    const [data] = await promiseDb.query(q, [+limit, +offset]);
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
    }
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
};

export const getById = async (req, res) => {
  const q = `SELECT j.* , p.name as province , c.nameCompany, c.avatarPic 
            FROM job.jobs AS j , job.companies AS c ,  job.provinces as p 
            WHERE j.id = ? AND j.idCompany = c.id AND j.idProvince = p.id`;

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getByIdCompany = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const { id } = req.params;
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const q = `SELECT j.id,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany, j.createdAt , p.name as province , c.nameCompany, c.avatarPic
               FROM job.jobs AS j , job.companies AS c ,  job.provinces as p 
               WHERE c.id = ? AND j.idCompany = c.id AND j.idProvince = p.id ORDER BY j.createdAt DESC limit ? offset ?`;

    const q2 = `SELECT count(*) as count FROM job.jobs AS j , job.companies AS c , job.provinces as p 
                WHERE c.id = ? AND j.idCompany = c.id AND j.idProvince = p.id`;

    const [data] = await promiseDb.query(q, [id, +limit, +offset]);
    const [totalPageData] = await promiseDb.query(q2, [id]);
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
    }
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
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
