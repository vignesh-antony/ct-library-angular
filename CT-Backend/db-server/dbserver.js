const db = require('./dbconn');

class DBServer{
    constructor(){ 
        this.response = {
            "error":{
                status:"Error",
                message:"Something went wrong!",
                description:"Please try again later"
            },
            "issue_success":{
                status:"Success",
                message:"Book Issued Successfully",
                description:"The book has been successfully issued to the staff"
            },
            "max_limit_reached":{ 
                status:"Warning", 
                message:"Maximum book count reached", 
                description:"The staff has reached the maximum book count limit." 
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
        let query = "SELECT * from `book` WHERE `bName` LIKE ? AND `bCategory` LIKE ? AND `bAuthor` LIKE ? AND `bPublish` LIKE ? AND `bYear` LIKE ? ORDER BY `bName`";
        return this.getData(query,[data.title, data.category, data.author, data.publisher, data.year]);
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
        if(count.length == 0){
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
}

module.exports = new DBServer();