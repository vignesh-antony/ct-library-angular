const db = require("./dbconn");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthServer {
    constructor() {
        this.response = {
            error: {
                status: "Error",
                message: "Something went wrong!",
                description: "Please try again later.",
            },
            "no-user": {
                status: "Error",
                message: "Invalid User/Password",
                description: "Please provide a valid Password/Register ID.",
            },
        };
    }
    performQuery(query, params = []) {
        return new Promise((resolve, reject) => {
            db.query(query, params, function (err, rows) {
                if (rows === undefined)
                    return reject(new Error("No results found"));
                else return resolve(rows);
            });
        });
    }
    async getData(query, params = []) {
        try {
            let data = await this.performQuery(query, params);
            return data;
        } catch (err) {
            return Promise.resolve(this.response["error"]);
        }
    }
    async checkLoginUser(data) {
        let query =
            "SELECT `ID`,`Name`,`Email Address`,`Pass`,`Type` FROM `staff` INNER JOIN `stafflist` USING(`ID`) WHERE `Email Address`= ? AND `Pass`= ?";
        let result = await this.getData(query, [data.email, data.password]);

        if (result && result.status != "Error" && result.length != 0) {
            try {
                let valid_user = {
                    user_id: result[0].ID,
                    user_name: result[0].Name,
                    user_email: result[0][`Email Address`],
                    admin: result[0].Type ? true : false,
                };
                return {
                    token: jwt.sign(valid_user, process.env.SECRET_KEY, {
                        expiresIn: "2h",
                    }),
                };
            } catch (err) {
                return this.response["error"];
            }
        } else return this.response["no-user"];
    }
}

module.exports = new AuthServer();
