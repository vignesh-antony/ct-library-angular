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
    async performQuery(query, params = []) {
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
            "SELECT `ID`,`Pass`,`Type` FROM `stafflist` WHERE `ID`= ? AND `Pass`= ?";
        let result = await this.getData(query, [data.id, data.password]);

        if (result && result.status != "Error" && result.length != 0) {
            try {
                let valid_user = { user_id: data.id, type: result[0].type };
                return jwt.sign(valid_user, process.env.SECRET_KEY);
            } catch (err) {
                return this.response["error"];
            }
        } else return this.response["no-user"];
    }
}

module.exports = new AuthServer();
