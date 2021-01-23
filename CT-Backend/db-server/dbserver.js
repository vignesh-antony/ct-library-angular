const db = require('./dbconn');

class DBServer{
    constructor(){ 
        this.response = {
            "error":{
                status:"Error",
                message:"Something went wrong!",
                description:"Please try again later."
            },
            "issue_success":{
                status:"Success",
                message:"Book Issued Successfully",
                description:"The book has been successfully issued to the staff."
            },
            "renew_success":{
                status:"Success",
                message:"Book Renewed Successfully",
                description:"The book has been successfully renewed for the staff."
            },
            "return_success":{
                status:"Success",
                message:"Book Returned Successfully",
                description:"The book has been successfully returned to the library."
            },
            "max_limit_reached":{ 
                status:"Warning", 
                message:"Maximum book count reached", 
                description:"The staff has reached the maximum book count limit." 
            },
            "categ_success":{
                status:"Success",
                message:"Book Category Added",
                description:"The new book category has been added successfully."
            },
            "categ_update":{
                status:"Success",
                message:"Book Category Updated",
                description:"The new book category has been updated successfully."
            },
            "categ_delete":{
                status:"Success",
                message:"Book Category Deleted",
                description:"The new book category has been deleted successfully."
            },
            "categ_del_error":{
                status:"Error",
                message:"Book Category Not Deleted",
                description:"For deletion, the book category should not contain any books in it."
            },
            "categ_error":{
                status:"Error",
                message:"Book Category Already Added",
                description:"Please try again with new category name."
            }
        };
    }
    async performQuery(query, params = []){
        return new Promise((resolve,reject) => {
            db.query(query, params, function(err, rows){                                                
                if(rows === undefined) return reject(new Error("No results found"));
                else return resolve(rows);
            })
        });
    }
    async getData(query, params = []){
        try{
            let data = await this.performQuery(query, params);
            return data;
        }
        catch(err){
            return Promise.resolve(this.response["error"]);
        }
    }
    async getBookList(data){
        let query = "SELECT * from `book` WHERE `bName` LIKE ? AND `cID` LIKE ? AND `bAuthor` LIKE ? AND `bPublish` LIKE ? AND `bYear` LIKE ? ORDER BY `bName`";
        return this.getData(query,[data.title, data.category, data.author, data.publisher, data.year]);
    }
    async getBookCategory(){
        let query = "SELECT `cID`, `cName`, COUNT(`bID`) as bcount FROM `bookcateg` LEFT OUTER JOIN `book` USING(`cID`) GROUP BY `cID` ORDER BY `bookcateg`.`cID`";
        return this.getData(query,[]);
    }
    async setBookCategory(data){
        let query = "INSERT INTO `bookcateg`(`cID`,`cName`) VALUES(?, ?)";
        let result = await this.getData(query, [data.cID, data.cName]);

        if(result && result.status != "Error"){
            return this.response["categ_success"];
        }
        else return this.response["categ_error"];
    }
    async updateBookCategory(data){
        let query = "UPDATE `bookcateg` SET `cID` = ?, `cName` = ? WHERE `cID` = ?";
        let result = await this.getData(query, [data.cID, data.cName, data.prev]);

        if(result && result.status != "Error"){
            return this.response["categ_update"];
        }
        else return this.response["categ_error"];
    }
    async deleteBookCategory(data){
        let query = "DELETE FROM `bookcateg` WHERE `cID` = ?";
        let result = await this.getData(query, [data.cID]);

        if(result && result.status != "Error"){
            return this.response["categ_delete"];
        }
        else return this.response["categ_del_error"];
    }
    async getStaffList(){
        let query = "SELECT `ID` as value, `Name` as name FROM `staff` NATURAL JOIN `stafflist` WHERE `type` = 0";
        return this.getData(query, []);
    }
    async getCategory(){
        let query = "SELECT `cID` as value, CONCAT(`cID`,' - ',`cName`) as name FROM `bookcateg`";
        return this.getData(query, []);
    }
    async getBorrowedBooks(id){
        let query = "SELECT * from `book` NATURAL JOIN `booklist` where `ID` = ? ORDER BY `timeIn` DESC";
        return this.getData(query,[id]);
    }
    async getPendingBooks(id){
        let query = "SELECT * from `book` NATURAL JOIN `booklist` where `ID` = ? AND `timeOut` < ? ORDER BY `timeOut` DESC";
        return this.getData(query,[id, new Date()]);
    }
    async getMaximumCount(id){
        let query = "SELECT COUNT(`bID`) FROM `booklist` WHERE `ID` = ? HAVING COUNT(`bID`) >= (SELECT `config_value` FROM config WHERE `config_id` = 1)";
        return this.getData(query,[id]);
    }
    async getRenewalTime(){
        let query = "SELECT `config_value` FROM `config` WHERE `config_id` = 2";
        return this.getData(query);
    }
    async addIssueEntry(sid, bid, renewal){
        let today = new Date();
        let due = new Date(new Date().setMonth(today.getMonth() + renewal));

        let query = "INSERT into `booklist`(`ID`,`bID`,`timeIn`,`timeOut`) values(? , ? , ? , ?)";
        return this.getData(query, [sid, bid, today, due]);
    }
    async reduceBookCount(bid){
        let query = "UPDATE `book` SET `bCopy`= `bCopy`-1 WHERE `bID`= ? AND `bCopy` > 0";
        return this.getData(query, [bid]);
    }
    async issueBooks(data){
        let count = await this.getMaximumCount(data.s_id);
        if(count && count.length == 0){
            let renewal = await this.getRenewalTime();
            let entry = await this.addIssueEntry(data.s_id, data.b_id, renewal[0]["config_value"]);

            if(entry && entry.status != "Error"){
                let update = await this.reduceBookCount(data.b_id);
                
                if(update) return this.response["issue_success"];
                else return this.response["error"];
            }
            else return this.response["error"];
        }
        else return this.response["max_limit_reached"];
    }
    async addRenewEntry(sid, bid, renewal){
        let today = new Date();
        let due = new Date(new Date().setMonth(today.getMonth() + renewal));

        let query = "UPDATE `booklist` SET `timeOut`= ? WHERE `ID`= ? AND `bID`= ?";
        return this.getData(query, [due, sid, bid]);
    }
    async renewBooks(data){
        let renewal = await this.getRenewalTime();
        if(renewal){
            let entry = await this.addRenewEntry(data.s_id, data.b_id, renewal[0]["config_value"]);
            if(entry && entry.status != "Error") return this.response["renew_success"];
            return this.response["error"];
        }
        else return this.response["error"];
    }
    async increaseBookCount(bid){
        let query = "UPDATE `book` SET `bCopy`= `bCopy`+1 WHERE `bID`= ?";
        return this.getData(query, [bid]);
    }
    async removeEntry(sid, bid){
        let query = "DELETE FROM `booklist` WHERE `ID`= ? AND `bID`= ?";
        return this.getData(query, [sid, bid]);
    }
    async returnBooks(data){
        let entry = await this.removeEntry(data.s_id, data.b_id);
        if(entry && !entry.status != 'Error'){
            let update = await this.increaseBookCount(data.b_id);
            
            if(update) return this.response["return_success"];
            else return this.response["error"];
        }
        else return this.response["error"];
    }
}

module.exports = new DBServer();