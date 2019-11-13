const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");

// Lấy thông tin của truyện
router.get("/truyen", (req, res) => {
    res.render("admin/trangLeechTruyen", {
        layout: 'admnLayout.hbs',
        titleTrang: "LEECH TRANG TRUYỆN"
    })
});
module.exports = router;
