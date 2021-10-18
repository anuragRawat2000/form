const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


const app = express();
app.use(cookieParser());

dotenv.config({ path: "./config.env" });

//database
require("./db/conn");

app.use(express.json());

// to link our router file to app js
app.use(require("./router/auth"));


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`port started ate ${PORT}`);
});
