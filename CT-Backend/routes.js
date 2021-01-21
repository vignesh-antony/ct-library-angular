const routes = require('express').Router();
const db = require('./db-server/dbserver')

routes.post('/book-list',(req, res) => {
    db.getBookList(req.body)
    .then((value)=>{
        res.send(value);
    })
});

module.exports = routes;