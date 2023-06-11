const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./src/utils/database/hr");

const initRoutes = require("./src/routes");

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const listener = app.listen(5000, () => {
  console.log("Server is running on the port " + listener.address().port);
});
