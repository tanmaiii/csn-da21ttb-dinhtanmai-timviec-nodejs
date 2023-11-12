import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getAll = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 10;

    const offset = (page - 1) * limit;

    const q = `SELECT j.id,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany, j.createdAt , p.name as province , c.nameCompany, c.avatarPic, f.name as nameFields
       FROM job.jobs AS j , job.companies AS c ,  job.provinces as p , job.fields as f
       WHERE j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id ORDER BY j.createdAt DESC limit ? offset ?`;

    const q2 = `SELECT count(*) as count FROM job.jobs AS j , job.companies AS c , job.provinces as p 
       WHERE j.idCompany = c.id AND j.idProvince = p.id`;

    const [data] = await promiseDb.query(q, [+limit, +offset]);
    const [totalData] = await promiseDb.query(q2);
    const totalPage = Math.ceil(+totalData[0]?.count / limit);

    if (data && totalData && totalPage) {
      return res.status(200).json({
        data: data,
        pagination: {
          page: +page,
          limit: +limit,
          totalPage,
          total: totalData[0]?.count,
        },
      });
    } else {
      res.status(200).json(undefined);
    }
  } catch (error) {
    return res.status(409).json("Lỗi !");
  }
};

export const findJobs = async (req, res) => {
  try {
    const { field } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const promiseDb = db.promise();

    const offset = (page - 1) * limit;

    const q =
      "SELECT j.id,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany, j.createdAt , p.name as province , c.nameCompany, c.avatarPic, f.name as nameFields FROM job.jobs AS j , job.companies AS c , job.provinces as p , job.fields as f WHERE f.name LIKE '%" +
      field +
      "%' AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id  ORDER BY j.createdAt DESC limit ? offset ?";
    const q2 =
      "SELECT count(*) as count FROM job.jobs AS j , job.companies AS c , job.provinces as p , job.fields as f WHERE f.name LIKE '%" +
      field +
      "%' AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id ORDER BY j.createdAt";

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
    } else {
      res.status(200).json(undefined);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getById = async (req, res) => {
  const q = `SELECT j.* , p.name as province , c.nameCompany, c.avatarPic , f.name as nameField
             FROM job.jobs AS j , job.companies AS c , job.provinces as p , job.fields as f
             WHERE j.id = ? AND j.idField = f.id  AND j.idCompany = c.id AND j.idProvince = p.id`;

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const getByIdCompany = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const { id } = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const q = `SELECT j.id,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany, j.createdAt , p.name as province , c.nameCompany, c.avatarPic
               FROM job.jobs AS j , job.companies AS c ,  job.provinces as p 
               WHERE c.id = ? AND j.idCompany = c.id AND j.idProvince = p.id ORDER BY j.createdAt DESC limit ? offset ?`;

    const q2 = `SELECT count(*) as count FROM job.jobs AS j , job.companies AS c , job.provinces as p 
                WHERE c.id = ? AND j.idCompany = c.id AND j.idProvince = p.id`;

    const [data] = await promiseDb.query(q, [id, +limit, +offset]);
    const [totalData] = await promiseDb.query(q2, [id]);
    const totalPage = Math.ceil(+totalData[0]?.count / limit);

    if (data && totalData && totalPage) {
      return res.status(200).json({
        data: data,
        pagination: {
          page: +page,
          limit: +limit,
          totalPage,
          total: totalData[0].count,
        },
      });
    } else {
      res.status(200).json(undefined);
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

export const getByIdField = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const promiseDb = db.promise();
    const { idField } = req.params;

    const offset = (page - 1) * limit;

    const q =
      "SELECT j.id, j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany, j.createdAt , p.name as province , c.nameCompany, c.avatarPic, f.name as nameFields FROM job.jobs AS j , job.companies AS c , job.provinces as p , job.fields as f WHERE f.id = ? AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id  ORDER BY j.createdAt DESC limit ? offset ?";
    const q2 =
      "SELECT count(*) as count FROM job.jobs AS j , job.companies AS c , job.provinces as p , job.fields as f WHERE f.id = ? AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id ORDER BY j.createdAt";

    const [data] = await promiseDb.query(q, [+idField, +limit, +offset]);
    const [totalPageData] = await promiseDb.query(q2, [+idField]);
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

    console.log(idField);

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
      return res.status(401).json("Không tìm thấy");
    }
  } catch (error) {
    return res.status(401).json("Lỗi");
  }
};
