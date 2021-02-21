const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthJWT {
    verifyToken(req, res, next) {
        let error = {
            status: "Error-Access",
            message: "Unauthorized Access",
            description: "Please try again after logging in.",
        };

        try {
            let req_headers = req.headers;
            if (!req_headers.authorization) {
                res.send(error);
            }

            let token = req_headers.authorization.split(" ")[1];
            if (token == null || token == undefined || token == "null") {
                res.send(error);
            }
            let jwt_client = jwt.verify(token, process.env.SECRET_KEY);
            if (!jwt_client) {
                res.send(error);
            }

            req.staff_id = jwt_client.subject;
            next();
        } catch (err) {
            res.send(error);
        }
    }
}

module.exports = new AuthJWT();
