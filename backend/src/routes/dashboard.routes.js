
const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboard.controller");
const { protectAdmin } = require("../middleware/auth.middleware");

router.get("/stats", protectAdmin, getDashboardStats);

module.exports = router;
