const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const Chapter = mongoose.model("Chapter");
router.get("/:slugTruyen", (req, res) => {
    var slugTruyen = req.params.slugTruyen;
    var q2 = Truyen.aggregate([{
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
            res.render("home/noiDungTrangDetail", {
                layout: 'homeLayout.hbs',
                noiDung: truyen[0],
            })
        }
    });
})
router.get("/:slugTruyen/:tenChap", (req, res) => {
    var arrTenChap = req.params.tenChap.split("-");
    var tenChap = arrTenChap[1];
    Cha.aggregate([{
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
        { $match: { slug_truyen: req.params.slugTruyen } }
        // ,
        // {
        //     $match: { "chap_moi_ra.ten_chuong": { $eq: arrTenChap[1] } }
        // }
    ]).exec(function(err, truyen) {
        if (!err) {
            console.log(truyen);
            res.render("home/noiDungTrangChapter", {
                layout: 'homeLayout.hbs'
            })
        }
    })
})
module.exports = router;