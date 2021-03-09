const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthJWT {
    verifyToken(req, res, next) {
        try {
            let req_headers = req.headers;
            if (!req_headers.authorization) {
                res.status(403).send("Unauthorized Access");
            }

            let token = req_headers.authorization.split(" ")[1];
            if (token == null || token == undefined || token == "null") {
                res.status(403).send("Unauthorized Access");
            }
            jwt.verify(token, process.env.SECRET_KEY, function (err, data) {
                if (err) {
                    res.status(403).send("Unauthorized Access");
                } else {
                    req.staff_id = data.user_id;
                    req.role = data.admin;
                    next();
                }
            });
        } catch (err) {}
    }
}

module.exports = new AuthJWT();
