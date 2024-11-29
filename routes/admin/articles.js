const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ mesage: "文章接口" });
});

module.exports = router;
