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

exports.getStudentsById = (req, res) => {
  let id = req.params.id;

  let sql = `SELECT * FROM tbl_mahasiswa WHERE id_mahasiswa = ?`;
  let data = [id];
  db.query(sql, data, (err, rows) => {
    console.log(rows.length);
    if (rows.length <= 0) {
      res.json({
        error: true,
        message: `Sorry, Data dengan id ${id} tidak ditemukan`,
      });
    } else {
      console.log(rows);

      res.json({
        error: false,
        result: rows,
      });
    }
  });
};

exports.editStudentsById = (req, res) => {
  data = {
    id: req.params.id,
    nim: req.body.nim,
    nama: req.body.nama,
    jurusan: req.body.jurusan,
  };

  db.query(
    `UPDATE tbl_mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?`,
    [data.nim, data.nama, data.jurusan, data.id],
    (err, result, fields) => {
      if (err) throw err;
      res.json({
        error: false,
        result: result,
      });
    }
  );
};

exports.DeleteStudents = (req, res) => {
  let id = req.params.id;

  db.query(
    `DELETE FROM tbl_mahasiswa WHERE id_mahasiswa = ?`,
    id,
    (err, rows) => {
      if (err) throw err;
      res.json({
        error: false,
        result: rows,
      });
    }
  );
};

exports.Matakuliah = (req, res) => {
  db.query(
    `SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan,
    matakuliah.id_matakuliah, matakuliah.matakuliah, matakuliah.sks FROM tbl_krs krs
    JOIN tbl_mahasiswa mahasiswa
    JOIN tbl_matakuliah matakuliah
    WHERE krs.id_matakuliah = matakuliah.id_matakuliah
    AND krs.id_mahasiswa = mahasiswa.id_mahasiswa
    ORDER BY mahasiswa.id_mahasiswa
`,
    (err, rows) => {
      if (err) throw err;
      res.json({
        error: false,
        result: rows,
      });
    }
  );
};
