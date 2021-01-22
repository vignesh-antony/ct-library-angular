const routes = require('express').Router();
const db = require('./db-server/dbserver')

routes.post('/book-list',(req, res) => {
    db.getBookList(req.body)
    .then((value)=>{
        res.send(value);
    })
});

routes.get('/borrowed-books',(req, res) => {
    db.getBorrowedBooks(1)
    .then((value)=>{
        res.send(value);
    })
});

routes.get('/pending-books',(req, res) => {
    db.getBorrowedBooks(58)
    .then((value)=>{
        res.send(value);
    })
});

routes.post('/issue-books',(req, res) => {
    db.issueBooks(req.body)
    .then((value)=>{
        res.send(value);
    })
});


module.exports = routes;