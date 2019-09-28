const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const TinTuc = mongoose.model("TinTuc");
var multer = require("multer");
var crypto = require("crypto");
var path = require("path");
// cấu hình multer
var storage = multer.diskStorage({

    // folder up file
    destination: 'public/upload',
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return cb(err)
            cb(null, Math.floor(Math.random() * 9000000000) + 1000000000 + path.extname(file.originalname))
        })
    }
});

var upload = multer({ storage: storage });

/*lấy tin tức*/
router.get("/", (req, res) => {
    TinTuc.find((err, docs) => {
        if (!err) {
            res.render("admin/quanLyTinTuc", {
                list: docs
            });
        } else {
            console.log("Error in retrieving tin tuc list: " + err);
        }
    });
});
// xóa tin tức
router.get("/delete/:id", (req, res) => {
    TinTuc.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/admin/tin-tuc");
        } else {
            console.log("Error in tin tức delete: " + err);
        }
    });
});

// thêm tin tức
router.get("/add", (req, res) => {
    res.render("admin/themSuaTinTuc", {
        viewTitle: "Thêm tin tức",
    });
});
// action thêm tin tức
// thêm tin tức
router.post("/add", upload.single("hinhBao"), (req, res) => {
    insertRecord(req, res);
});


function insertRecord(req, res) {
    var tinTuc = new TinTuc();
    tinTuc.tieu_de = req.body.tieuDe;
    tinTuc.nguoi_dang = req.body.nguoiDang;
    tinTuc.noi_dung_ngan = req.body.noiDungNgan;
    tinTuc.noi_dung = req.body.noiDung;
    tinTuc.hinh_bao = req.body.hinhBao;
    tinTuc.ngay_dang = new Date();
    tinTuc.save((err, doc) => {
        if (!err)
            res.redirect("/admin/tin-tuc");
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("admin/themSuaTinTuc", {
                    viewTitle: "Thêm tin tức"
                });
            } else
                console.log("Error during record insertion: ", err);
        }
    })
}

module.exports = router;