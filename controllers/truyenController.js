const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
router.get("/", (req, res) => {
    var q = Truyen.find();
    q.exec(function(err, docs) {
        if (!err) {
            res.render("admin/quanLyTruyen", {
                layout: 'adminLayout.hbs',
                list: docs
            });
        }
    });
})

// thêm truyện
router.get("/add", (req, res) => {
    res.render("admin/themSuaTruyen", {
        viewTitle: "THÊM SỬA TRUYỆN"
    });
});

// Add thông tin truyện
router.post("/add", (req, res) => {
    if (req.body.truyenId == "") {
        console.log(req.body.truyenId);
        insertRecord(req, res);
    } else
        updateRecord(req, res);
});

// hàm thêm mới
function insertRecord(req, res) {
    var truyen = new Truyen();
    truyen.ten_chuong = req.body.tenChuong;
    truyen.tac_gia = req.body.tacGia;
    truyen.hinh_truyen = req.body.hinhTruyen;
    truyen.noi_dung = req.body.noiDung;
    truyen.save((err, doc) => {
        if (!err) {
            res.redirect("/admin/truyen/");
        } else {
            if (err.name == "ValidationError") {
                res.render("admin/themSuaTruyen", {
                    viewTitle: "THÊM SỬA TRUYỆN"
                });
            } else
                console.log("Error during record insertion: ", err);
        }
    })
}


// hàm cập nhật
function updateRecord(req, res) {
    var foundTruyen = new Truyen();

    if (req.body.truyenId) {
        foundTruyen._id = new ObjectId(req.body.truyenId);
    }

    if (req.body.tenTruyen) {
        foundTruyen.ten_chuong = req.body.tenChuong;
    }

    if (req.body.tacGia) {
        foundTruyen.tac_gia = req.body.tacGia;
    }

    if (req.body.hinhTruyen) {
        foundTruyen.hinh_truyen = req.body.hinhTruyen;
    }

    if (req.body.noiDung) {
        foundTruyen.noi_dung = req.body.noiDung;
    }

    foundTruyen.findByIdAndUpdate(new ObjectId(req.body.truyenId), foundChapter, { new: true, strict: false, setDefaultsOnInsert: true }, function(err, doc) {
        if (!err) {
            res.redirect("/admin/chapter/" + req.body.truyenId);
        } else {
            if (err.name == "ValidationError") {
                res.redirect("admin/themSuaTruyen")
            } else
                console.log("Error during record update: " + err);
        }
    });
}

module.exports = router;