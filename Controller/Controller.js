const db = require("../Database/connection");

exports.index = (req, res) => {
  if (!req) {
    res.json({
      error: true,
      message: "Error, Request not found",
    });
  } else {
    res.json({
      error: false,
      message: "Hello World",
    });
  }
};

exports.addStudents = (req, res) => {
  let sql = `INSERT INTO tbl_mahasiswa (nim,nama,jurusan) VALUES (?, ?, ?)`;
  let data = [req.body.nim, req.body.nama, req.body.jurusan];

  db.query(sql, data, (err, rows, fields) => {
    if (err) throw err;
    res.json({
      error: false,
      result: rows,
    });
  });
};

exports.getAllStudents = (req, res) => {
  db.query("SELECT * FROM tbl_mahasiswa", (err, result) => {
    if (err) throw err;
    res.json({
      error: false,
      result: result,
    });
  });
};
