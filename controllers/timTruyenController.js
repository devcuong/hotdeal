const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const Chapter = mongoose.model("Chapter");
const Error = mongoose.model("Error");
var ObjectId = require('mongoose').Types.ObjectId;
const dateFormat = require('dateformat');

// Lấy truyện theo thể loại
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

// Lấy truyện theo keyword
router.post("/tu-khoa/", (req, res) => {
    var tuKhoa = req.body.tuKhoa.trim();
    Truyen.find( { 'ten_truyen' : { '$regex' : tuKhoa, '$options' : 'i' } } , { ten_truyen: 1, slug_truyen: 1 }).limit(20).exec(function(err, truyen){
        if(!err){
            res.send(JSON.stringify(truyen));
        }
    })
})
module.exports = router;
