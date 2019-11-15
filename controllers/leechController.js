const express = require("express");
var request = require("request");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
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
    console.log(req);
    var truyen = new Truyen();
    truyen.ten_truyen = req.body.tenTruyen;
    truyen.slug_truyen = stringHandle.changeToSlug(req.body.tenTruyen);
    truyen.tac_gia = req.body.tacGia;
    truyen.hinh_truyen = req.body.hinhTruyen;
    truyen.noi_dung = req.body.noiDung;
    var arrTheLoai = new Array();
    arrTheLoai = req.body.theLoai.trim().split(",");
    truyen.the_loai = arrTheLoai;
    truyen.so_chuong = "0";
    truyen.luot_xem = "0";
    truyen.luot_danh_gia = "0";
    truyen.xep_hang = "0";
    truyen.luot_theo_doi = "0";
    truyen.save((err, doc) => {
        if (err) {
            console.log(err); 
        } else {
            console.log(doc);
        }
    })
})
module.exports = router;
