import { db } from "../config/connect.js";

export const getAll = (req, res) => {
  const q =
    "SELECT id as fId, name as name , name as value, name as label, typeField FROM job.fields";

  db.query(q, (err, data) => {
    if (!data.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};

export const getWithType = (req, res) => {
  const q = `SELECT f.id, name as name , name as value, name as label, typeField, count(j.nameJob) as countJobs 
     FROM job.fields as f LEFT JOIN job.jobs as j on f.id = j.idField group by f.id`;

  db.query(q, (err, data) => {
    if (!data.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};
