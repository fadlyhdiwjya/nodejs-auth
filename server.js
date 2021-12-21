// Import Express
const express = require("express");
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
const port = 3000;

app.listen(port, () => console.log("Server is Running on port :", port));
