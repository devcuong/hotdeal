const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const Chapter = mongoose.model("Chapter");
var ObjectId = require('mongoose').Types.ObjectId;
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
            res.render("home/noiDungTrangDetail", {
                layout: 'homeLayout.hbs',
                noiDung: truyen[0],
            })
        }
    });
})
router.get("/:slugTruyen/:tenChap/:idChap", (req, res) => {

    // Chapter.findById(new ObjectId(req.params.idChap)).exec(function(err, truyen) {
    //     if (!err) {
    //         res.render("home/noiDungTrangChapter", {
    //             layout: 'homeLayout.hbs',
    //             chapTruyen: truyen
    //         })
    //     }
    // })
    var idChap = req.params.idChap;
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
                nameTruyen: truyen[0].truyen_chap[0].ten_truyen
            })
        }
    });
});
module.exports = router;