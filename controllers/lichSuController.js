const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");

// Lấy thông tin của truyện
router.get("/", (req, res) => {
    res.render("home/noiDungTrangHistory", {
        layout: 'homeLayout.hbs',
        titleTrang: "LỊCH SỬ ĐỌC TRUYỆN"
    })
});
module.exports = router;