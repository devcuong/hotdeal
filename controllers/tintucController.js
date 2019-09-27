const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const TinTuc = mongoose.model("TinTuc");

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
    TinTuc.find((err, docs) => {
        if (!err) {
            res.render("admin/themSuaTinTuc", {
                // list: docs
            });
        } else {
            console.log("Lỗi lấy trang: " + err);
        }
    });
});



module.exports = router;