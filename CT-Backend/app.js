const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const auth = require("./routes/auth");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());
app.use("/", routes);
app.use("/auth", auth);

app.listen(port, function () {
    console.log("Server running in", port);
});
