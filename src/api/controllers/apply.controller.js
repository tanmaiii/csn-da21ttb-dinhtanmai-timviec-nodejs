import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import moment from "moment";
import checkUrl from "../middlewares/checkUrl.middleware.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";

export const getJobApply = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  try {
    const promiseDb = db.promise();
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const offset = (page - 1) * limit;

    const q = `SELECT a.id, j.id as idJob,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany,  p.name as province , c.nameCompany, c.avatarPic, f.name as nameFields , a.createdAt, a.status
               FROM job.apply_job as a , job.jobs as j , job.companies AS c ,  job.provinces as p , job.fields as f 
               WHERE a.idUser = ? AND a.idJob = j.id AND  j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id order by a.createdAt desc limit ? offset ?`;

    const q2 = `SELECT count(*) as count 
                FROM job.apply_job as a , job.jobs as j , job.companies AS c ,  job.provinces as p , job.fields as f 
                WHERE a.idUser = ? AND a.idJob = j.id AND  j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id`;

    jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(401).json("Token is not invalid");

      const [data] = await promiseDb.query(q, [userInfo.id, +limit, +offset]);
      const [total] = await promiseDb.query(q2, userInfo.id);
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
    });
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
};

export const getUser = async (req, res) => {
  try {
    const q =
      "SELECT DISTINCT idUser FROM job.apply_job as a WHERE a.idJob = ?";

    db.query(q, [req.query.idJob], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((user) => user.idUser));
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const applyJob = (req, res) => {
  const { idJob, name, email, phone, letter, linkCv } = req.body;

  if (!idJob || !name || !email || !phone || !letter || !linkCv)
    return res.status(401).json("Các trường không để rỗng !");

  if (!checkEmail(email)) return res.status(401).json("Email không hợp lệ.");
  if (!checkUrl(linkCv)) return res.status(401).json("Link cv không hợp lệ.");

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not invalid");

    const q =
      "INSERT INTO job.apply_job ( `idUser`, `idJob`, `name`, `email`, `phone`, `status`, `letter`, `linkCv`, `createdAt`) VALUES (?)";
    const values = [
      userInfo.id,
      idJob,
      name,
      email,
      phone,
      1,
      letter,
      linkCv,
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

    const q =
      "DELETE FROM job.follow_company WHERE `id_user` = ? AND `id_company` = ?";

    db.query(q, [userInfo.id, req.query.idCompany], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thành công!");
    });
  });
};
