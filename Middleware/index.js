const express = require("express");
const router = express.Router();
const auth = require("./Auth");
const verifikasi = require("./verifikasi");

router.post("/api/v1/register", auth.Register);
router.post("/api/v1/login", auth.login);
router.get("/api/v1/halaman", verifikasi(), auth.halamanDua);

module.exports = router;
