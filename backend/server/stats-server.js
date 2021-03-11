const db = require("./dbconn");

class StatsServer {
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
    getBorrowCount(data, role) {
        let params = [];

        let query = "SELECT COUNT(`bID`) as borrow FROM `booklist`";
        if (data && !role) {
            query += " WHERE `ID` = ?";
            params.push(data);
        }

        return this.getData(query, params);
    }
    getTotalBooks() {
        let query = "SELECT COUNT(`bID`) as total FROM `book`";
        return this.getData(query, []);
    }
    getPendingCount(data, role) {
        let params = [];

        let query =
            "SELECT COUNT(`bID`) as pending FROM `booklist` WHERE `timeOut` < ?";
        if (data && !role) {
            query += " AND `ID` = ?";
            params.push(new Date(), data);
        } else params.push(new Date());

        return this.getData(query, params);
    }
}
module.exports = new StatsServer();
