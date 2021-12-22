const connection = require("../Database/connection");
const mysql = require("mysql");
const md5 = require("md5");
const Config = require("../Config/secret");
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

// Login

exports.login = (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };

  //  Validasi Email

  let cek = `SELECT * FROM tbl_users WHERE email = ?`;
  let table = [data.email];

  connection.query(cek, table, (err, rows) => {
    if (err) throw err;

    if (rows.length == 1) {
      var token = jwt.sign({ rows }, Config.secret, {
        expiresIn: 1440,
      });

      //    Cek Users
      let id_user = rows[0].id_user;

      let data = {
        id_user: id_user,
        access_token: token,
        ip_address: ip.address(),
      };

      let sql = `INSERT INTO tbl_akses_token (id_user, access_token, ip_address) VALUES ('${data.id_user}', '${data.access_token}', '${data.ip_address}')`;
      connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.json({
          error: false,
          message: "Token Berhasil di Generate",
          token: token,
          currUser: data.id_user,
        });
      });
    } else {
      res.json({ error: true, message: "Email atau password salah" });
    }
  });
};
