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

export const getUserByCpn = (req, res) => {
  try {
    const promiseDb = db.promise();
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || "new";
    const idJob = req.query.idJob;
    const status = req.query.status;
    const search = req.query.search;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Chưa đăng nhập !");

    const offset = (page - 1) * limit;

    let q = `SELECT a.id, a.idUser, a.name, a.status, a.createdAt , j.nameJob, u.avatarPic FROM job.apply_job as a, job.jobs as j , job.companies AS c , job.provinces as p , job.fields as f , job.users as u
             WHERE c.id = ? AND a.deletedAt is null AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id `;

    let q2 = `SELECT count(*) as count 
              FROM job.apply_job as a, job.jobs as j , job.companies AS c , job.provinces as p , job.fields as f , job.users as u
              WHERE c.id = ? AND a.deletedAt is null AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id `;

    if (idJob) {
      q += ` AND a.idJob = ${idJob} `;
      q2 += ` AND a.idJob = ${idJob} `;
    }

    if (status) {
      q += ` AND a.status = ${status} `;
      q2 += ` AND a.status = ${status} `;
    }

    if (search) {
      q += ` AND (a.name LIKE '%${search}%' OR a.email LIKE '%${search}%' OR a.phone LIKE '%${search}%') `;
      q2 += ` AND (a.name LIKE '%${search}%' OR a.email LIKE '%${search}%' OR a.phone LIKE '%${search}%') `;
    }

    if (sort === "new") {
      q += ` ORDER BY a.createdAt DESC `;
    } else if (sort === "old") {
      q += ` ORDER BY a.createdAt ASC `;
    }

    jwt.verify(token, "secretkey", async (err, cpn) => {
      const [data] = await promiseDb.query(
        `${q} limit ${+limit} offset ${+offset}`,
        [cpn.id]
      );
      const [total] = await promiseDb.query(q2, cpn.id);
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

export const getUserHideByCpn = (req, res) => {
  try {
    const promiseDb = db.promise();
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Chưa đăng nhập !");

    const offset = (page - 1) * limit;

    let q = `SELECT a.id, a.idUser, a.name, a.status, a.createdAt , j.nameJob, u.avatarPic FROM job.apply_job as a, job.jobs as j , job.companies AS c , job.provinces as p , job.fields as f , job.users as u
             WHERE c.id = ? AND not a.deletedAt is null AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id ORDER BY a.deletedAt DESC`;

    let q2 = `SELECT count(*) as count 
              FROM job.apply_job as a, job.jobs as j , job.companies AS c , job.provinces as p , job.fields as f , job.users as u
              WHERE c.id = ? AND not a.deletedAt is null AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id `;

    jwt.verify(token, "secretkey", async (err, cpn) => {
      const [data] = await promiseDb.query(
        `${q} limit ${+limit} offset ${+offset}`,
        [cpn.id]
      );
      const [total] = await promiseDb.query(q2, cpn.id);
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

export const getDetailApply = async (req, res) => {
  try {
    const { id } = req.params;
    const q = `SELECT a.* , j.nameJob, u.avatarPic, u.sex FROM job.apply_job as a, job.jobs as j , job.companies AS c , job.provinces as p , job.fields as f , job.users as u
      WHERE a.id = ? AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id`;

    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getStatus = async (req, res) => {
  try {
    const id = req.query.id;
    const q = `SELECT a.status FROM job.apply_job as a WHERE a.id = ?`;

    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]?.status);
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

export const updateStatusJob = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q =
      "UPDATE job.apply_job as a , job.companies as c, job.jobs as j SET `status`= ? WHERE a.id = ? AND c.id = ? AND a.idJob = j.id AND j.idCompany = c.id";

    const values = [req.query.status, req.query.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const hiddenJobByCpn = (req, res) => {
  const token = req.cookies.accessToken;

  const id = req.query.id;
  const idFilter = id.join("','");

  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q = `UPDATE job.apply_job as a , job.companies as c, job.jobs as j SET \`deletedAt\` = '${moment(
      Date.now()
    ).format(
      "YYYY-MM-DD HH:mm:ss"
    )}' WHERE a.id in ('${idFilter}') AND a.idJob = j.id AND j.idCompany = c.id AND c.id = ${
      userInfo.id
    }`;

    db.query(q, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const unHiddenJobByCpn = (req, res) => {
  const token = req.cookies.accessToken;

  const id = req.query.id;
  const idFilter = id.join("','");

  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q = `UPDATE job.apply_job as a , job.companies as c, job.jobs as j SET \`deletedAt\` = null WHERE a.id in ('${idFilter}') AND a.idJob = j.id AND j.idCompany = c.id AND c.id = ${userInfo.id}`;

    db.query(q, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};
