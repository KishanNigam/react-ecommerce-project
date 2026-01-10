const express = require("express");
const router = express.Router();

const { orderTest } = require("../controllers/order.controller");

router.get("/test", orderTest);

module.exports = router;
