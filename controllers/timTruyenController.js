const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const Chapter = mongoose.model("Chapter");
const Error = mongoose.model("Error");
var ObjectId = require('mongoose').Types.ObjectId;
const dateFormat = require('dateformat');

// Lấy thông tin của truyện
router.get("/:theLoaiTruyen", (req, res) => {
    var theLoaiTruyen = req.params.theLoaiTruyen;
    Truyen.find({ the_loai: theLoaiTruyen }).exec(function(err, truyen) {
        if (!err) {
            res.render("home/noiDungTrangTimTruyen", {
                layout: 'homeLayout.hbs',
                lstTruyen: truyen,
                titleTrang: "DANH SÁCH TRUYỆN"
            })
        }
    });
})
module.exports = router;