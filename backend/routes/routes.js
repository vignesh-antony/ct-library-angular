const routes = require("express").Router();
const middleware = require("../middleware/verify-token");
const db = require("../server/dbserver");

routes.use(middleware.verifyToken);

routes.post("/book-list", (req, res) => {
    db.getBookList(req.body).then((value) => {
        res.send(value);
    });
});

routes.get("/staff-list", (req, res) => {
    db.getStaffList().then((value) => {
        res.send(value);
    });
});

routes.get("/borrowed-books", (req, res) => {
    db.getBorrowedBooks(req.staff_id).then((value) => {
        res.send(value);
    });
});

routes.get("/pending-books", (req, res) => {
    db.getPendingBooks(req.staff_id).then((value) => {
        res.send(value);
    });
});

routes.post("/issue-books", (req, res) => {
    db.issueBooks(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/renew-books", (req, res) => {
    db.renewBooks(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/return-books", (req, res) => {
    db.returnBooks(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/add-books", (req, res) => {
    db.addBooks(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/update-books", (req, res) => {
    db.updateBooks(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/delete-books", (req, res) => {
    db.deleteBooks(req.body).then((value) => {
        res.send(value);
    });
});

routes.get("/get-category", (req, res) => {
    db.getCategory().then((value) => {
        res.send(value);
    });
});

routes.get("/book-category", (req, res) => {
    db.getBookCategory().then((value) => {
        res.send(value);
    });
});

routes.post("/book-borrow-category", (req, res) => {
    db.getBookBorrowCategory().then((value) => {
        res.send(value);
    });
});

routes.post("/set-category", (req, res) => {
    db.setBookCategory(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/update-category", (req, res) => {
    db.updateBookCategory(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/delete-category", (req, res) => {
    db.deleteBookCategory(req.body).then((value) => {
        res.send(value);
    });
});

routes.post("/transactions", (req, res) => {
    db.getTransactions(req.body, req.staff_id, req.role).then((value) => {
        res.send(value);
    });
});

module.exports = routes;
