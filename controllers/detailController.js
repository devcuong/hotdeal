const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const Chapter = mongoose.model("Chapter");
const Error = mongoose.model("Error");
var ObjectId = require('mongoose').Types.ObjectId;
const dateFormat = require('dateformat');

// Lấy thông tin của truyện
router.get("/:slugTruyen", (req, res) => {
    var slugTruyen = req.params.slugTruyen;
    Truyen.aggregate([{
            $lookup: { from: "chapter", localField: "_id", foreignField: "ma_truyen", as: "chap_moi_ra" }
        },
        // {
        //     "$addFields": {
        //         "chap_moi_ra": { "$slice": ["$chap_moi_ra", -3] }
        //     }
        // },
        {
            $lookup: { from: "theloai", localField: "the_loai", foreignField: "slug_the_loai", as: "ds_the_loai" }
        },
        { $match: { slug_truyen: slugTruyen } }

    ]).exec(function(err, truyen) {
        if (!err) {
            console.log(truyen[0]);
            res.render("home/noiDungTrangDetail", {
                layout: 'homeLayout.hbs',
                noiDung: truyen[0],
            })
        }
    });
})

// lấy nội dung truyện
router.get("/:slugTruyen/:tenChap/:idChap", (req, res) => {
    var idChap = req.params.idChap;
    var slugTruyen = req.params.slugTruyen;
    var q = Chapter.findOne({ "_id": new ObjectId(idChap) });
    q.exec(function(err, doc) {
        if (!err) {
            doc.luot_xem = Number(doc.luot_xem) + 1;
            doc.save(function(errUpdate) {
                if (!errUpdate) {
                    var q2 = Truyen.findOne({"slug_truyen": slugTruyen});
                    q2.exec(function(err2, doc2){
                        if(!err2)
                        {
                            doc2.luot_xem = Number(doc2.luot_xem) + 1;
                            doc2.save(function(errupdate2){
                                Chapter.aggregate([{
                                    $lookup: { from: "truyen", localField: "ma_truyen", foreignField: "_id", as: "truyen_chap" }
                                },
                                {
                                    "$addFields": {
                                        "truyen_chap": { "$slice": ["$truyen_chap", -1] }
                                    }
                                },
                                { $match: { _id: new ObjectId(idChap) } }
        
                            ]).exec(function(err, truyen) {
                                if (!err) {
                                    res.render("home/noiDungTrangChapter", {
                                        layout: 'homeLayout.hbs',
                                        chapTruyen: truyen[0],
                                        nameTruyen: truyen[0].truyen_chap[0]
                                    })
                                }
                            });
                            })
                        }

                    })
                   
                }
            })
        }
    })
});

router.post("/error/:idChap", (req, res) => {
    var idChap = req.params.idChap;
    var q = Error.findOne({ "error_chap": idChap });
    q.exec(function(err, doc) {
        if (!err) {
            if (doc.length == 0) {
                insertRecord(req, res);
            } else {
                res.json("lỗi đã được thông báo tới quản trị viên, xin cảm ơn");
            }

        }
    })
})


// hàm thêm mới
function insertRecord(req, res) {
    var error = new Error();
    error.error_chap = req.params.idChap;
    error.mo_ta = req.body.errorField;
    error.ngay_bao = dateFormat(new Date(), "dd/mm/yyyy");
    error.save((err, doc) => {
        if (!err) {
            res.json("lỗi đã được thông báo tới quản trị viên, xin cảm ơn");
        }
    })
}

// lấy list chapter của truyện và comment
router.post("/:idTruyen", (req, res) => {
    var idTruyen = req.params.idTruyen;
    var q = Chapter.find({ "ma_truyen": new ObjectId(idTruyen) });
    q.exec(function(err, docs) {
        if (!err) {
            var o = new Object;
            var keyListChap = "listChap";
            o[keyListChap] = [];
            var keySuccess = "success";
            o[keySuccess] = true;
            var arrIdChap = new Array();
            docs.forEach(function(item) {
                var objChap = new Object();
                objChap.ten_chap = item.ten_chuong;
                objChap.id_chap = item._id;
                o[keyListChap].push(objChap);
            })
            res.send(JSON.stringify(o));
        }
    });
})
module.exports = router;