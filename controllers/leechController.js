const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");

// Lấy thông tin của truyện
router.get("/", (req, res) => {
    res.render("admin/trangLeechTruyen", {
        layout: 'adminLayout.hbs',
        titleTrang: "LEECH TRANG TRUYỆN"
    })
});
module.exports = router;
