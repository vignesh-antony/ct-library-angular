const routes = require("express").Router();
const middleware = require("../middleware/verify-token");
const stats = require("../server/stats-server");

routes.use(middleware.verifyToken);

routes.get("/library", async (req, res) => {
    const total = await stats.getTotalBooks();
    const borrow = await stats.getBorrowCount(req.staff_id, req.role);
    const pending = await stats.getPendingCount(req.staff_id, req.role);

    res.send({
        total: total[0].total,
        borrow: borrow[0].borrow,
        pending: pending[0].pending,
    });
});

module.exports = routes;
