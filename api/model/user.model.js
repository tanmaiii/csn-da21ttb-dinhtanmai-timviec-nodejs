import { db } from "../config/connect.js";

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.phone = user.phone;
};

User.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("Tạo thành công: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  db.query("SELECT * FROM users WHERE email=?", email, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result(null, null);
  });
};

User.update = ( editUser ,id , result) => {
  db.query("UPDATE INTO users ? WHERE id = ? ", editUser, id, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("Tạo thành công: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.resetPassword = (email, password, result) => {
  db.query(
    "UPDATE users SET password = ? WHERE email=?",
    email,
    password,
    (err, res) => {
      if ((err, res)) {
        console.log("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { email: email });
    }
  );
};

export default User;
