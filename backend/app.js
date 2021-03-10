const express = require("express");
const cors = require("cors");

const routes = require("./routes/routes");
const auth = require("./routes/auth");
const stats = require("./routes/stats");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/stats", stats);
app.use("/", routes);

app.listen(port, function () {
    console.log("Server running in", port);
});
