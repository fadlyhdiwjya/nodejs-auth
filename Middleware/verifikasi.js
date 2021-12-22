const jwt = require("jsonwebtoken");
const config = require("../Config/secret");

function verifikasi() {
  return (req, rest, next) => {
    let tokenWithBearer = req.headers.authorization;
    console.log(tokenWithBearer);
    let role = req.body.role;
    if (tokenWithBearer) {
      let token = tokenWithBearer.split(" ")[1];

      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          rest
            .status(401)
            .send({ auth: false, message: "Token tidak terdaftar" });
        } else {
          if (role == 2) {
            (req.auth = decoded), next();
          } else {
            rest
              .status(401)
              .send({ auth: false, message: "gagal verifikasi role anda" });
          }
        }
      });
    } else {
      rest.status(401).send({ auth: false, message: "Token tidak terdaftar" });
    }
  };
}

module.exports = verifikasi;
