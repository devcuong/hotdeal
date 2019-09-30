const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const TinTuc = mongoose.model("TinTuc");
var multer = require("multer");
var crypto = require("crypto");
var path = require("path");
const dateFormat = require('dateformat');

// cấu hình multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
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

// sửa tin tức
router.get("/edit/:id", (req, res) => {
    var tt = new Date().getTime();
    TinTuc.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("admin/themSuaTinTuc", {
                viewTitle: "Update Tin tức",
                tintuc: doc
            });
        }
    });
});
// action sửa tin tức
// sửa tin tức
router.post("/edit", upload.single("hinhBao"), (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var tinTuc = new TinTuc();
    tinTuc.tieu_de = req.body.tieuDe;
    tinTuc.nguon_dang = req.body.nguonDang;
    tinTuc.nguoi_dang = req.body.nguoiDang;
    tinTuc.noi_dung_ngan = req.body.noiDungNgan;
    tinTuc.noi_dung = req.body.noiDung;
    tinTuc.hinh_bao = req.file.originalname;
    tinTuc.ngay_dang = dateFormat(new Date(), "dd/mm/yyyy");
    tinTuc.save((err, doc) => {
        if (!err) {
            console.log(doc);
            res.redirect("/admin/tin-tuc");
        } else {
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
// quản lý validation
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case "tieu_de":
                body["tieuDeError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
module.exports = router;