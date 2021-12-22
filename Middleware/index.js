const express = require("express");
const router = express.Router();
const auth = require("./Auth");

router.post("/api/v1/register", auth.Register);
router.post("/api/v1/login", auth.login);

module.exports = router;
