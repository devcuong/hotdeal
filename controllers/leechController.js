const express = require("express");
var request = require("request");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const Chapter = mongoose.model("Chapter");
var ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment');
const stringHandle = require("../utils/stringHandle.js");
// Load trang leech truyện
router.get("/", (req, res) => {
    res.render("admin/trangLeechTruyen", {
        layout: 'adminLayout.hbs',
        titleTrang: "LEECH TRUYỆN"
    })
});

// Lấy thông tin của truyện
router.post("/", (req, res) => {
    var urlTruyen = req.body.url;
    var svTruyen = "http://chauau3.herokuapp.com/lay-truyen?id=" + urlTruyen;
    request(
        svTruyen,
        function (error, response, body) {
            if (error) {
                return "lỗi";
            } else {
                res.json(body);
            }
        });
});

// thêm truyện
router.post("/them-truyen", (req, res) => {
    var truyen = new Truyen();
    truyen.ten_truyen = req.body.tenTruyen;
    truyen.slug_truyen = stringHandle.changeToSlug(req.body.tenTruyen);
    truyen.tac_gia = req.body.tacGia;
    truyen.hinh_truyen = req.body.hinhTruyen;
    truyen.noi_dung = req.body.noiDung;
    var arrTheLoai = new Array();
    arrTheLoai = req.body.theLoai.trim().split(",");
    var arrTheLoaiAdd = new Array();
    for (var i = 0; i < arrTheLoai.length; i++) {
        arrTheLoaiAdd.push(arrTheLoai[i].trim());
    }
    truyen.the_loai = arrTheLoaiAdd;
    truyen.so_chuong = "0";
    truyen.luot_xem = "0";
    truyen.luot_danh_gia = "0";
    truyen.xep_hang = "0";
    truyen.luot_theo_doi = "0";
    truyen.save((err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.json(doc._id);
        }
    })
})

// thêm chapter theo truyện
router.post("/them-chapter", (req, res) => {
    var chapter = new Chapter();
    chapter.ten_chuong = req.body.tenChuong;
    chapter.ma_truyen = new ObjectId(req.body.idTruyen);
    chapter.thoi_gian_tao = moment(Date.now).format('YYYY-MM-YY HH:mm');
    chapter.luot_xem = "0";
    if (req.body.server1 && req.body.server2) {
        var lstServer1 = req.body.server1.trim().split(',');
        var lstServer2 = req.body.server2.trim().split(',');
        for (var i = 0; i < lstServer1.length; i++) {
            var sv = { sv_original: lstServer1[i], sv_cdn: lstServer2[i] };
            chapter.server_truyen.push(sv);
        }
    }
    chapter.save((err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.json(doc._id);
        }
    })
})
module.exports = router;
