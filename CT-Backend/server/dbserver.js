const db = require("./dbconn");

class DBServer {
    constructor() {
        this.response = {
            error: {
                status: "Error",
                message: "Something went wrong!",
                description: "Please try again later.",
            },
            issue_success: {
                status: "Success",
                message: "Book Issued Successfully",
                description:
                    "The book has been successfully issued to the staff.",
            },
            renew_success: {
                status: "Success",
                message: "Book Renewed Successfully",
                description:
                    "The book has been successfully renewed for the staff.",
            },
            return_success: {
                status: "Success",
                message: "Book Returned Successfully",
                description:
                    "The book has been successfully returned to the library.",
            },
            add_success: {
                status: "Success",
                message: "Books Added Successfully",
                description: "The book details have been successfully added.",
            },
            update_success: {
                status: "Success",
                message: "Book Updated Successfully",
                description: "The book details have been successfully updated.",
            },
            delete_borrow: {
                status: "Error",
                message: "Book Not Deleted",
                description:
                    "Books that are borrowed by the staff cannot be deleted.",
            },
            delete_success: {
                status: "Success",
                message: "Book Deleted Successfully",
                description:
                    "The book has been successfully removed from the library.",
            },
            max_limit_reached: {
                status: "Warning",
                message: "Maximum book count reached",
                description:
                    "The staff has reached the maximum book count limit.",
            },
            categ_success: {
                status: "Success",
                message: "Book Category Added",
                description:
                    "The new book category has been added successfully.",
            },
            categ_update: {
                status: "Success",
                message: "Book Category Updated",
                description:
                    "The new book category has been updated successfully.",
            },
            categ_delete: {
                status: "Success",
                message: "Book Category Deleted",
                description:
                    "The new book category has been deleted successfully.",
            },
            categ_del_error: {
                status: "Error",
                message: "Book Category Not Deleted",
                description:
                    "For deletion, the book category should not contain any books in it.",
            },
            categ_error: {
                status: "Error",
                message: "Book Category Already Added",
                description: "Please try again with new category name.",
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
    async insertLog(data) {
        let cont = JSON.stringify(data.content);
        let s_id = data.s_id ? data.s_id : 0;

        let query =
            "INSERT INTO `logs`(`sID`,`type_ref`,`content`,`logTime`) VALUES(?, ?, ?, ?)";
        return this.getData(query, [s_id, data.type, cont, data.time]);
    }
    async getBookList(data) {
        let query =
            "SELECT * from `book` WHERE `bName` LIKE ? AND `cID` LIKE ? AND `bAuthor` LIKE ? AND `bPublish` LIKE ? AND `bYear` LIKE ? ORDER BY `bName`";
        return this.getData(query, [
            data.title,
            data.category,
            data.author,
            data.publisher,
            data.year,
        ]);
    }
    async getBookCategory() {
        let query =
            "SELECT `cID`, `cName`, COUNT(`bID`) as bcount FROM `bookcateg` LEFT OUTER JOIN `book` USING(`cID`) GROUP BY `cID` ORDER BY `bookcateg`.`cID`";
        return this.getData(query, []);
    }
    async getBookBorrowCategory() {
        let categ = await this.getBookCategory();

        let query =
            "SELECT `cID`, `cName`, COUNT(`bookborrow`.`bID`) as bcount FROM `bookcateg` NATURAL JOIN (SELECT `bID`, `cID` FROM `book` NATURAL JOIN `booklist`) as `bookborrow` GROUP BY `cID` ORDER BY `bcount` DESC LIMIT 0,10";
        let borrow = await this.getData(query, []);

        return { borrow: borrow, categ: categ };
    }
    async setBookCategory(data) {
        let query = "INSERT INTO `bookcateg`(`cID`,`cName`) VALUES(?, ?)";
        let result = await this.getData(query, [data.cID, data.cName]);

        if (result && result.status != "Error") {
            await this.insertLog({
                type: 6,
                content: {
                    message: "Book Category has been inserted",
                    title: data.cName,
                    sub_title: "Category Code - " + data.cID,
                },
                time: new Date(),
            });
            return this.response["categ_success"];
        } else return this.response["categ_error"];
    }
    async updateBookCategory(data) {
        let query =
            "UPDATE `bookcateg` SET `cID` = ?, `cName` = ? WHERE `cID` = ?";
        let result = await this.getData(query, [
            data.cID,
            data.cName,
            data.prev,
        ]);

        if (result && result.status != "Error") {
            await this.insertLog({
                type: 7,
                content: {
                    message: "Book Category has been updated",
                    title: data.cName,
                    sub_title: "Category Code - " + data.cID,
                },
                time: new Date(),
            });
            return this.response["categ_update"];
        } else return this.response["categ_error"];
    }
    async deleteBookCategory(data) {
        let query = "DELETE FROM `bookcateg` WHERE `cID` = ?";
        let result = await this.getData(query, [data.cID]);

        if (result && result.status != "Error") {
            await this.insertLog({
                type: 8,
                content: {
                    message: "Book Category has been deleted",
                    title: data.cName,
                    sub_title: "Category Code - " + data.cID,
                },
                time: new Date(),
            });
            return this.response["categ_delete"];
        } else return this.response["categ_del_error"];
    }
    async getStaffList() {
        let query =
            "SELECT `ID` as value, `Name` as name FROM `staff` NATURAL JOIN `stafflist` WHERE `type` = 0";
        return this.getData(query, []);
    }
    async getCategory() {
        let query =
            "SELECT `cID` as value, CONCAT(`cID`,' - ',`cName`) as name FROM `bookcateg`";
        return this.getData(query, []);
    }
    async getBorrowedBooks(id) {
        let query =
            "SELECT * from `book` NATURAL JOIN `booklist` where `ID` = ? ORDER BY `timeIn` DESC";
        return this.getData(query, [id]);
    }
    async getPendingBooks(id) {
        let query =
            "SELECT * from `book` NATURAL JOIN `booklist` where `ID` = ? AND `timeOut` < ? ORDER BY `timeOut` DESC";
        return this.getData(query, [id, new Date()]);
    }
    async getMaximumCount(id) {
        let query =
            "SELECT COUNT(`bID`) FROM `booklist` WHERE `ID` = ? HAVING COUNT(`bID`) >= (SELECT `config_value` FROM config WHERE `config_id` = 1)";
        return this.getData(query, [id]);
    }
    async getRenewalTime() {
        let query = "SELECT `config_value` FROM `config` WHERE `config_id` = 2";
        return this.getData(query);
    }
    async addIssueEntry(sid, bid, renewal) {
        let today = new Date();
        let due = new Date(new Date().setMonth(today.getMonth() + renewal));

        let query =
            "INSERT into `booklist`(`ID`,`bID`,`timeIn`,`timeOut`) values(? , ? , ? , ?)";
        return this.getData(query, [sid, bid, today, due]);
    }
    async reduceBookCount(bid) {
        let query =
            "UPDATE `book` SET `bCopy`= `bCopy`-1 WHERE `bID`= ? AND `bCopy` > 0";
        return this.getData(query, [bid]);
    }
    async issueBooks(data) {
        let count = await this.getMaximumCount(data.s_id);
        if (count && count.length == 0) {
            let renewal = await this.getRenewalTime();
            let entry = await this.addIssueEntry(
                data.s_id,
                data.b_id,
                renewal[0]["config_value"]
            );

            if (entry && entry.status != "Error") {
                let update = await this.reduceBookCount(data.b_id);

                if (update) {
                    await this.insertLog({
                        type: 9,
                        content: {
                            message:
                                "Book has been issued to staff - " +
                                data.s_name,
                            title: data.b_name,
                            sub_title: data.b_auth,
                            id: data.b_id,
                            categ: data.c_id,
                        },
                        time: new Date(),
                        s_id: data.s_id,
                    });
                    return this.response["issue_success"];
                } else return this.response["error"];
            } else return this.response["error"];
        } else return this.response["max_limit_reached"];
    }
    async addRenewEntry(sid, bid, renewal) {
        let today = new Date();
        let due = new Date(new Date().setMonth(today.getMonth() + renewal));

        let query =
            "UPDATE `booklist` SET `timeOut`= ? WHERE `ID`= ? AND `bID`= ?";
        return this.getData(query, [due, sid, bid]);
    }
    async renewBooks(data) {
        let renewal = await this.getRenewalTime();
        if (renewal) {
            let entry = await this.addRenewEntry(
                data.s_id,
                data.b_id,
                renewal[0]["config_value"]
            );
            if (entry && entry.status != "Error") {
                await this.insertLog({
                    type: 10,
                    content: {
                        message:
                            "Book has been renewed for staff - " + data.s_name,
                        title: data.b_name,
                        sub_title: data.b_auth,
                        id: data.b_id,
                        categ: data.c_id,
                    },
                    time: new Date(),
                    s_id: data.s_id,
                });
                return this.response["renew_success"];
            }
            return this.response["error"];
        } else return this.response["error"];
    }
    async increaseBookCount(bid) {
        let query = "UPDATE `book` SET `bCopy`= `bCopy`+1 WHERE `bID`= ?";
        return this.getData(query, [bid]);
    }
    async removeEntry(sid, bid) {
        let query = "DELETE FROM `booklist` WHERE `ID`= ? AND `bID`= ?";
        return this.getData(query, [sid, bid]);
    }
    async returnBooks(data) {
        let entry = await this.removeEntry(data.s_id, data.b_id);
        if (entry && entry.status != "Error") {
            let update = await this.increaseBookCount(data.b_id);

            if (update) {
                await this.insertLog({
                    type: 11,
                    content: {
                        message:
                            "Book has been returned from staff - " +
                            data.s_name,
                        title: data.b_name,
                        sub_title: data.b_auth,
                        id: data.b_id,
                        categ: data.c_id,
                    },
                    time: new Date(),
                    s_id: data.s_id,
                });
                return this.response["return_success"];
            } else return this.response["error"];
        } else return this.response["error"];
    }
    async insertBook(data, i_query) {
        let query =
            "INSERT INTO `book`(`cID`,`bName`,`bAuthor`,`bPublish`,`bYear`,`bCopy`) VALUES " +
            i_query;
        return this.getData(query, data);
    }
    async addNewBooks(data) {
        let i_query = "";
        let params = [];

        for (let i = data.book_count; i < data.bCopy; i++) {
            i_query += "(?, ?, ?, ?, ?, ?),";
            params.push(
                data.cID,
                data.bName,
                data.bAuthor,
                data.bPublish,
                data.bYear,
                1
            );
        }
        i_query = i_query.slice(0, -1);

        return this.insertBook(params, i_query);
    }
    async updateOldBook(data) {
        let query =
            "UPDATE `book` SET `cID` = ?, `bName` = ?, `bAuthor` = ?, `bPublish` = ?, `bYear` = ? WHERE `bID` = ?";
        return this.getData(query, [
            data.cID,
            data.bName,
            data.bAuthor,
            data.bPublish,
            data.bYear,
            data.bID,
        ]);
    }
    async updateBooks(data) {
        let res = { status: "" };

        if (+data.bCopy > data.book_count) {
            res = await this.addNewBooks(data);
            if (res.status != "Error") {
                await this.insertLog({
                    type: 3,
                    content: {
                        message: "Book has been inserted",
                        title: data.bName,
                        sub_title: data.bAuthor,
                        count: data.bCopy,
                    },
                    time: new Date(),
                });
            }
        }

        if (res && res.status != "Error") res = await this.updateOldBook(data);

        if (res == undefined || res.status == "Error") {
            return this.response["error"];
        } else {
            await this.insertLog({
                type: 4,
                content: {
                    message: "Book has been updated",
                    title: data.bName,
                    sub_title: data.bAuthor,
                    id: data.bID,
                    categ: data.cID,
                    count: 1,
                },
                time: new Date(),
            });
            return this.response["update_success"];
        }
    }
    async deleteCheck(data) {
        let query = "SELECT `ID` FROM `booklist` WHERE `bID` = ?";
        return this.getData(query, [data]);
    }
    async deleteBooks(data) {
        let check = await this.deleteCheck(data.bID);
        if (check && check.status != "Error" && check.length == 0) {
            let query = "DELETE FROM `book` WHERE `bID` = ?";
            let res = await this.getData(query, [data.bID]);

            if (res && res.status != "Error") {
                await this.insertLog({
                    type: 5,
                    content: {
                        message: "Book has been deleted",
                        title: data.bName,
                        sub_title: data.bAuthor,
                        id: data.bID,
                        categ: data.cID,
                        count: 1,
                    },
                    time: new Date(),
                });
                return this.response["delete_success"];
            } else return res;
        } else return this.response["delete_borrow"];
    }
    async addBooks(data) {
        let res = await this.addNewBooks(data);
        if (res == undefined || res.status == "Error") {
            return this.response["error"];
        } else {
            await this.insertLog({
                type: 3,
                content: {
                    message: "Book has been inserted",
                    title: data.bName,
                    sub_title: data.bAuthor,
                    count: data.bCopy,
                    categ: data.cID,
                    id: res.insertId,
                },
                time: new Date(),
            });
            return this.response["add_success"];
        }
    }
    async getTransactions(data) {
        let query_get = "";
        let query = "SELECT `type_ref`,`content`,`logTime` FROM `logs` ";
        let query_count = "SELECT COUNT(`logID`) as total FROM `logs` ";

        let params = [];

        if (
            data != null &&
            data.staff != undefined &&
            (data.staff ||
                data.start_date ||
                data.end_date ||
                (data.type && data.type.length))
        ) {
            query_get += "WHERE ";

            if (data.type.length != 0) {
                query_get += "`type_ref` IN (";

                data.type.forEach((elem) => {
                    if (elem == 0) query_get += "3,4,5,6,7,8,";
                    else query_get += elem + ",";
                });

                query_get = query_get.slice(0, -1);
                query_get += ") ";

                if (data.staff || data.start_date || data.end_date)
                    query_get += "AND ";
            }

            if (data.staff) {
                query_get += "`sID` = ? ";
                params.push(data.staff);
            }

            if (data.staff && (data.start_date || data.end_date))
                query_get += "AND ";

            if (data.start_date && data.end_date) {
                query_get += "DATE(`logTime`) BETWEEN ? AND ? ";
                params.push(data.start_date, data.end_date);
            } else if (data.start_date) {
                query_get += "DATE(`logTime`) >= ? ";
                params.push(data.start_date);
            } else if (data.end_date) {
                query_get += "DATE(`logTime`) <= ? ";
                params.push(data.end_date);
            }
        }

        let total = await this.getData(query_count + query_get, params);

        query_get +=
            "ORDER BY `logTime` DESC LIMIT " +
            (data.start ? data.start : 0) +
            ", 12";

        let transactions = await this.getData(query + query_get, params);
        return {
            total: total[0] ? total[0].total : 0,
            transactions: transactions,
        };
    }
}

module.exports = new DBServer();
