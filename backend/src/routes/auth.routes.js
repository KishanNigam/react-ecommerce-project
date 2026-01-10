const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/auth.controller");
const { protectAdmin } = require("../middleware/auth.middleware");

router.post("/admin/login", adminLogin);

// VERIFY TOKEN / GET LOGGED IN ADMIN
router.get("/admin/me", protectAdmin, (req, res) => {
  return res.status(200).json({
    message: "Token valid",
    admin: req.admin, // { id, role }
  });
});

module.exports = router;
