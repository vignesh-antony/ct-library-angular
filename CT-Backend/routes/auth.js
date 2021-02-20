const routes = require("express").Router();
const auth_server = require("../server/auth_server");

routes.post("/login", (req, res) => {
    auth_server.checkLoginUser(req.body).then((value) => {
        res.send({ token: value });
    });
});

module.exports = routes;
