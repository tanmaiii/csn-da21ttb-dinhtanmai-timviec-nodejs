import { db } from "../config/connect.js";

export const getAll = (req, res) => {
  const q =
    "SELECT id as pId ,name as name , name as value, name as label, nameWithType FROM job.provinces;";

  db.query(q, (err, data) => {
    if (!data.length) {
      return res.status(401).json("Không tồn tại !");
    } else {
      return res.json(data);
    }
  });
};

export const getWithPage = async (req, res) => {
  try {
    const promiseDb = db.promise()
    const { page, limit } = req.query;

    const offset = (page - 1) * limit;
    const q = "SELECT * from job.provinces limit ? offset ? ";
    const q2 = "SELECT count(*) as count FROM job.provinces";
    

    const [data] = await promiseDb.query(q, [+limit, +offset]);
    const [totalPageData] = await promiseDb.query(q2);
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit)

    //return res.status(200).json(data)
    if (data && totalPageData && totalPage) {
      return res.status(200).json({
        data:data,
        pagination:{
          page: +page,
          limit: + limit,
          totalPage
        }
      })
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
