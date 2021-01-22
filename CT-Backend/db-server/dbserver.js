const db = require('./dbconn');

class DBServer{
    constructor(){ }
    async performQuery(query, params = []){
        let result = new Promise((resolve,reject) => {
            db.query(query, params, function(err, rows){                                                
                if(rows === undefined) reject(new Error("No results found"));
                else resolve(rows);
            })
        });
        return result;
    }
    async getData(query, params = []){
        let data = await this.performQuery(query, params);
        return data;
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
}

module.exports = new DBServer();