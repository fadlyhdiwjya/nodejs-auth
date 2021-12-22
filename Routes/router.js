module.exports = (app) => {
  var Controller = require("../Controller/Controller");

  //  Route index
  app.route("/").get(Controller.index);

  //   Route Menambahkan data Mahasiswa
  app.route("/students").post(Controller.addStudents);

  //   Route Menampilkan data Mahasiswa
  app.route("/students").get(Controller.getAllStudents);

  //   Route Menampilkan MataKuliah

  app.route("/students/matakuliah").get(Controller.Matakuliah);

  //   Route Menampilkan data berdasarkan ID
  app.route("/students/:id").get(Controller.getStudentsById);

  //   Route Mengubah Data Mahasiswa
  app.route("/students/:id").put(Controller.editStudentsById);

  //   Route Menghapus Data Mahasiswa
  app.route("/students/:id").delete(Controller.DeleteStudents);
};
