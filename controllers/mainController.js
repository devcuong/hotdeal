const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
const mongoose = require("mongoose");
const TheLoai = mongoose.model("TheLoai");
const Truyen = mongoose.model("Truyen");

// trang chu
router.get("/", (req, res) => {
        var q2 = Truyen.aggregate([{
                $lookup: { from: "chapter", localField: "_id", foreignField: "ma_truyen", as: "chap_moi_ra" }
            },
            {
                "$addFields": {
                    "chap_moi_ra": { "$slice": ["$chap_moi_ra", -3] }
                }
            }
        ]).limit(12).exec(function(err2, truyens) {
            if (!err2) {
                res.render("home/noiDungTrangChu", {
                    layout: 'homeLayout.hbs',
                    lstTruyenDeCu: truyens,
                    lstTruyenCapNhat: truyens
                });
            } else {
                console.log(err2);
            }
        })
    })
    // trang chu
router.get("/hot", (req, res) => {
        var sortTruyen = { luot_xem: -1 };
        Truyen.find().sort(sortTruyen).exec(function(err, truyen) {
            if (!err) {
                res.render("home/noiDungTrangTimTruyen", {
                    layout: 'homeLayout.hbs',
                    lstTruyen: truyen,
                    titleTrang: "TRUYỆN HOT"
                })
            }
        });
    })
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

// load image va upload image
router.get("/files", function(req, res) {
    const images = fs.readdirSync("public/upload")
    var sorted = []
    for (let item of images) {
        if (item.split('.').pop() == 'png' ||
            item.split('.').pop() == 'jpg' ||
            item.split('.').pop() == 'jpeg' ||
            item.split('.').pop() == 'svg') {
            var abc = {
                "image": "/upload/" + item,
                "folder": "/"
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
});

router.post("/upload", upload.array("flFileUpload", 12), function(req, res, next) {
    res.redirect("back");
});

router.post("/delete_file", function(req, res, next) {
    var url_del = "public" + req.body.url_del
    if (fs.existsSync(url_del)) {
        fs.unlinkSync(url_del)
    }
    res.redirect("back");
});


module.exports = router;