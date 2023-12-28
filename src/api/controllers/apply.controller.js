import jwt from "jsonwebtoken";
import { db } from "../config/connect.js";
import moment from "moment";
import checkUrl from "../middlewares/checkUrl.middleware.js";
import checkEmail from "../middlewares/checkEmail.middleware.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import "express-async-errors";

export const getJobApply = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  try {
    const promiseDb = db.promise();
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const offset = (page - 1) * limit;

    const q = `SELECT a.id, j.id as idJob,  j.nameJob, j.salaryMax, j.salaryMin, j.typeWork, j.idCompany,  p.name as province , c.nameCompany, c.avatarPic, f.name as nameFields , a.createdAt, a.status
               FROM apply_job as a , jobs as j , companies AS c ,  provinces as p , fields as f 
               WHERE a.idUser = ? AND a.idJob = j.id AND  j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id order by a.createdAt desc limit ? offset ?`;

    const q2 = `SELECT count(*) as count 
                FROM apply_job as a , jobs as j , companies AS c , provinces as p , fields as f 
                WHERE a.idUser = ? AND a.idJob = j.id AND  j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id`;

    jwt.verify(token, process.env.MY_SECRET, async (err, userInfo) => {
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

    let q = `SELECT a.id, a.idUser, a.name, a.email, a.status, a.cv, a.createdAt , j.nameJob, u.avatarPic FROM apply_job as a, jobs as j , companies AS c , provinces as p , fields as f , users as u
             WHERE c.id = ? AND a.deletedAt is null AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id `;

    let q2 = `SELECT count(*) as count 
              FROM apply_job as a, jobs as j , companies AS c , provinces as p , fields as f , users as u
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

    jwt.verify(token, process.env.MY_SECRET, async (err, cpn) => {
      const [data] = await promiseDb.query(`${q} limit ${+limit} offset ${+offset}`, [cpn.id]);
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

    let q = `SELECT a.id, a.idUser, a.name, a.status, a.createdAt , j.nameJob, u.avatarPic FROM apply_job as a, jobs as j , companies AS c , provinces as p , fields as f , users as u
             WHERE c.id = ? AND not a.deletedAt is null AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id ORDER BY a.deletedAt DESC`;

    let q2 = `SELECT count(*) as count 
              FROM apply_job as a, jobs as j , companies AS c , provinces as p , fields as f , users as u
              WHERE c.id = ? AND not a.deletedAt is null AND a.idUser = u.id AND a.idJob = j.id AND j.idCompany = c.id AND j.idProvince = p.id AND j.idField = f.id `;

    jwt.verify(token, process.env.MY_SECRET , async (err, cpn) => {
      const [data] = await promiseDb.query(`${q} limit ${+limit} offset ${+offset}`, [cpn.id]);
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
    const q = "SELECT DISTINCT idUser FROM apply_job as a WHERE a.idJob = ?";

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
    const q = `SELECT a.* , j.nameJob, u.avatarPic, u.sex FROM apply_job as a, jobs as j , companies AS c , provinces as p , fields as f , users as u
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
    const q = `SELECT a.status FROM apply_job as a WHERE a.id = ?`;

    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]?.status);
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const applyJob = (req, res) => {
  const { idJob, name, email, phone, letter, cv } = req.body;

  if (!idJob || !name || !email || !phone || !letter || !cv)
    return res.status(401).json("Các trường không để rỗng !");

  if (!checkEmail(email)) return res.status(401).json("Email không hợp lệ.");

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    if (err) return res.status(401).json("Token is not invalid");

    const q =
      "INSERT INTO apply_job ( `idUser`, `idJob`, `name`, `email`, `phone`, `status`, `letter`, `cv`, `createdAt`) VALUES (?)";
    const values = [
      userInfo.id,
      idJob,
      name,
      email,
      phone,
      1,
      letter,
      cv,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Thành công!");
    });
  });
};

export const updateStatusUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q =
      "UPDATE apply_job as a , companies as c, jobs as j SET `status`= ? WHERE a.id = ? AND c.id = ? AND a.idJob = j.id AND j.idCompany = c.id";

    const values = [req.query.status, req.query.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });

    const q2 = "SELECT * FROM apply_job as a WHERE a.id = ?";

    db.query(q2, req.query.id, (err, data) => {
      if (err) return res.status(401).json("Lỗi !");

      const url = `http://localhost:3000/nguoi-dung/${data[0]?.idUser}/apply`;

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.MAIL_NAME}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        },
      });

      const emailHTML = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thông báo: Trạng thái Đơn Ứng Tuyển của Bạn đã Thay Đổi</title>
      </head>
      
      <body>
      
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
              <h2>Thông báo: Trạng thái Đơn Ứng Tuyển của Bạn đã Thay Đổi</h2>
              <p>Chào ${data[0].name},</p>
              <p>Chúng tôi hy vọng bạn đang có một ngày tốt lành. Chúng tôi xin gửi đến bạn một thông báo quan trọng liên quan đến đơn ứng tuyển mà bạn đã nộp trên trang web của chúng tôi.</p>
              <p>Chúng tôi muốn thông báo rằng trạng thái của đơn ứng tuyển của bạn đã trải qua một thay đổi gần đây từ phía nhà tuyển dụng. Xin lưu ý rằng các thay đổi này có thể bao gồm việc xem xét đơn, thay đổi trạng thái, hoặc các bước tiếp theo trong quá trình tuyển dụng.</p>
              <p>Để biết thông tin chi tiết hơn về trạng thái hiện tại của đơn ứng tuyển của bạn, vui lòng đăng nhập vào tài khoản của bạn trên trang web của chúng tôi và kiểm tra mục  <a href="${url}">"Ứng tuyển"</a> . Nếu có bất kỳ câu hỏi hoặc thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email này.</p>
              <p>Chúng tôi chân thành cảm ơn sự quan tâm và tham gia của bạn trong quá trình tuyển dụng này. Chúng tôi hy vọng bạn sẽ tiếp tục theo dõi thông báo và cập nhật từ chúng tôi.</p>
              <p>Trân trọng,<br>
                  JobQuest<br>
                  <a href="mailto:jobquestofficial@gmail.com">jobquestofficial@gmail.com</a> 
              </p>
          </div>
      
      </body>
      
      </html>
      `;

      var mailOptions = {
        from: `${process.env.MAIL_NAME}`,
        to: `${data[0].email}`,
        subject: "JobQuest || Đơn ứng tuyển",
        text: "",
        html: emailHTML,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.send({ Status: "Success" });
        }
      });
    });
  });
};

export const hiddenUserByCpn = (req, res) => {
  const token = req.cookies.accessToken;

  const id = req.query.id;
  const idFilter = id.join("','");

  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q = `UPDATE apply_job as a , jobs as j SET a.deletedAt = '${moment(Date.now()).format(
      "YYYY-MM-DD HH:mm:ss"
    )}' WHERE a.id in ('${idFilter}') AND a.idJob = j.id AND j.idCompany = ${userInfo.id}`;

    db.query(q, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};

export const unHiddenUserByCpn = (req, res) => {
  const token = req.cookies.accessToken;

  const id = req.query.id;
  const idFilter = id.join("','");

  if (!token) return res.status(401).json("Chưa đăng nhập !");

  jwt.verify(token, process.env.MY_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token không trùng !");
    const q = `UPDATE apply_job as a , jobs as j SET a.deletedAt = null WHERE a.id in ('${idFilter}') AND a.idJob = j.id  AND j.idCompany = ${userInfo.id}`;

    db.query(q, (err, data) => {
      if (!err) return res.status(200).json(data);
      if (data?.affectedRows > 0) return res.json("Update");
      return res.status(403).json("Chỉ thay đổi được thông tin của mình");
    });
  });
};
