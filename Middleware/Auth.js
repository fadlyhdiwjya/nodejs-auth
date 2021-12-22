const connection = require("../Database/connection");
const mysql = require("mysql");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const ip = require("ip");

// Register

exports.Register = (req, res) => {
  let data = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.username),
    role: req.body.role,
    tanggal_daftar: new Date(),
  };

  //    Cek Email apakah sudah terdaftar

  let sql = `SELECT * FROM tbl_users WHERE email = ?`;
  let table = [data.email];

  connection.query(sql, table, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 0) {
        connection.query(
          `INSERT INTO tbl_users (username, email, password, role, tanggal_daftar) VALUES ('${data.username}', '${data.email}', '${data.password}', '${data.role}', '${data.tanggal_daftar}')`,
          (err, result) => {
            if (err) throw err;
            res.json({ error: true, result: result });
          }
        );
      } else {
        res.json({ error: true, message: "Email sudah ada" });
      }
    }
  });
};
