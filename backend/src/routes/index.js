const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/dashboard", require("./dashboard.routes"));
router.use("/products", require("./product.routes"));
router.use("/upload", require("./upload.routes"));
router.use("/categories", require("./category.routes"));


module.exports = router;
