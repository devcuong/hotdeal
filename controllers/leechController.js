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
        function(error, response, body) {
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
    truyen.nguon_net_truyen = req.body.nguonNetTruyen;
    truyen.hinh_truyen = req.body.hinhTruyen;
    truyen.noi_dung = req.body.noiDung;
    truyen.ngay_cap_nhat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var arrTheLoai = new Array();
    arrTheLoai = req.body.theLoai.trim().split(",");
    var arrTheLoaiAdd = new Array();
    for (var i = 0; i < arrTheLoai.length; i++) {
        arrTheLoaiAdd.push(arrTheLoai[i].trim());
    }
    truyen.the_loai = arrTheLoaiAdd;
    truyen.so_chuong = req.body.soChap;
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
    var svChapter = "http://chauau3.herokuapp.com/lay-chapter?id=" + req.body.url;
    console.log(svChapter);
    request(
        svChapter,
        function(error, response, body) {
            if (error) {
                return "lỗi";
            } else {
                var jsonChap = JSON.parse(body);
                var chapter = new Chapter();
                chapter.ten_chuong = jsonChap.ten_chuong;
                chapter.ma_truyen = new ObjectId(req.body.idTruyen);
                chapter.luot_xem = "0";
                chapter.server_truyen = jsonChap.server_truyen;
                chapter.thoi_gian_tao = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                chapter.save((err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(doc._id);
                    }
                })
            }
        });
})

// check update
router.post("/update-chapter", (req, res) => {
    var svChapter = "http://chauau3.herokuapp.com/check-update?id=" + req.body.url + "&current=" + req.body.soChap;
    request(
        svChapter,
        function(error, response, body) {
            if (error) {
                return "lỗi";
            } else {
                var jsonChapUpdate = JSON.parse(body);
                if (req.body.soChap == jsonChapUpdate.so_chap) {
                    res.json("Không có chap mới");
                } else {
                    var listChapter = jsonChapUpdate.danh_sach_chap;
                    let params = { idTruyen: req.body.idTruyen, url: listChapter[i] };
                    for (var i = 0; i < listChapter.length; i++) {
                        request.post(
                            url: 'http://localhost:3000/admin/leech/them-chapter',
                            body: params,
                            function(error, response, body) {
                                if (!error) {
                                    res.json(response);
                                } else {
                                    console.log(error);
                                }
                            }
                        );
                    }
                }
            }
        })
})
module.exports = router;