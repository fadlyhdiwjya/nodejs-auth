// Import Express
const express = require("express");
require("dotenv").config();
const app = express();
// Import Body-Parser
const bodyParser = require("body-parser");
// Import Cors
const cors = require("cors");
// Import Morgan
const morgan = require("morgan");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
// Parse Application/json
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Import Routes

const routes = require("./Routes/router");
routes(app);

app.listen(process.env.APP_PORT, () =>
  console.log("Server is Running on port :", process.env.APP_PORT)
);
