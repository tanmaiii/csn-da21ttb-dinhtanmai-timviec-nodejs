import { db } from "../config/connect.js";

export const getAll = (req, res) => {
  const q =
    "SELECT id as pId ,name as name , name as value, name as label, nameWithType FROM provinces";

  db.query(q, (err, data) => {
    if (!data?.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};

export const getWithType = (req, res) => {
  const q = `SELECT p.id ,name as name , name as value, name as label, nameWithType, count(j.nameJob) as countJobs 
    FROM provinces as p LEFT JOIN jobs as j on p.id = j.idProvince group by p.id`;

  db.query(q, (err, data) => {
    if (!data?.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};
