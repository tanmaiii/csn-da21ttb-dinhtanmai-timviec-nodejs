import { db } from "../config/connect.js";
import "express-async-errors";

export const getAll = (req, res) => {
  const q =
    "SELECT id as fId, name as name , name as value, name as label, typeField FROM fields";

  db.query(q, (err, data) => {
    if (!data?.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};

export const getWithType = (req, res) => {
  const q = `SELECT f.id, name as name , name as value, name as label, typeField, count(j.nameJob) as countJobs 
     FROM fields as f LEFT JOIN jobs as j on f.id = j.idField and j.deletedAt is null group by f.id`;

  db.query(q, (err, data) => {
    if (!data?.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};
