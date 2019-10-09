const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Chapter = mongoose.model("Chapter");
var ObjectId = require('mongoose').Types.ObjectId;


var timeHandle = require('../utils/timeHandle.js')

// quản lý chapter trong truyện
router.get("/:idTruyen", (req, res) => {
        var idTruyen = req.params.idTruyen;
        var q = Chapter.find({ "ma_truyen": new ObjectId(idTruyen) });
        q.exec(function(err, docs) {
            if (!err) {
                console.log(docs);
                res.render("admin/quanLyChapter", {
                    layout: 'adminLayout.hbs',
                    list: docs,
                    idT: idTruyen
                });
            }
        });
    })
    // Update thông tin chapter theo truyện
router.get("/edit/:cid/:tid", (req, res) => {
    var chapId = req.params.cid;
    var truyenId = req.params.tid;
    Chapter.findById(new ObjectId(chapId), (err, chapterFounded) => {
        if (!err) {
            res.render("admin/themSuaChapter", {
                layout: 'adminLayout.hbs',
                viewTitle: "THÊM SỬA CHAPTER",
                chapter: chapterFounded,
                tId: truyenId
            });
        }
    });
})

// thêm tin tức
router.get("/add/:idTruyen", (req, res) => {
    var idTruyen = req.params.idTruyen;
    res.render("admin/themSuaChapter", {
        viewTitle: "THÊM SỬA CHAPTER",
        tId: idTruyen
    });
});

// Add thông tin chapter
router.post("/add", (req, res) => {
    if (req.body.chapId == "")
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

// hàm thêm mới
function insertRecord(req, res) {
    var chapter = new Chapter();
    chapter.ten_chuong = req.body.tenChuong;
    chapter.ma_truyen = new ObjectId(req.body.idTruyen);
    chapter.server_1 = req.body.server1;
    chapter.server_2 = req.body.server2;
    chapter.server_3 = req.body.server3;
    chapter.server_4 = req.body.server4;
    chapter.server_5 = req.body.server5;
    chapter.save((err, doc) => {
        if (!err) {
            res.redirect("/admin/chapter/" + req.body.idTruyen);
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("admin/themSuaChapter", {
                    viewTitle: "THÊM SỬA CHAPTER"
                });
            } else
                console.log("Error during record insertion: ", err);
        }
    })
}


// hàm cập nhật
function updateRecord(req, res) {
    var foundChapter = new Chapter();

    if (req.body.chapId) {
        foundChapter._id = new ObjectId(req.body.chapId);
    }

    if (req.body.tenChuong) {
        foundChapter.ten_chuong = req.body.tenChuong;
    }

    if (req.body.idTruyen) {
        foundChapter.ma_truyen = req.body.idTruyen;
    }

    if (req.body.server1) {
        foundChapter.server_1 = req.body.server1;
    }

    if (req.body.server2) {
        foundChapter.server_2 = req.body.server2;
    }

    if (req.body.server3) {
        foundChapter.server_3 = req.body.server3;
    }

    if (req.body.server4) {
        foundChapter.server_4 = req.body.server4;
    }

    if (req.body.server5) {
        foundChapter.server_5 = req.body.server5;
    }
    Chapter.findByIdAndUpdate(new ObjectId(req.body.chapId), foundChapter, { new: true, strict: false, setDefaultsOnInsert: true }, function(err, doc) {
        if (!err) {
            res.redirect("/admin/chapter/" + req.body.idTruyen);
        } else {
            if (err.name == "ValidationError") {
                //handleValidationError(err, req.body);
                res.redirect("admin/chapter/edit/" + req.body._id + "/" + req.body.idTruyen)
            } else
                console.log("Error during record update: " + err);
        }
    });
}

// xóa chapter
router.get("/delete/:id/:idTruyen", (req, res) => {
    Chapter.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/admin/chapter/" + req.params.idTruyen);
        } else {
            console.log("Error in chapter delete: " + err);
        }
    });
});
module.exports = router;