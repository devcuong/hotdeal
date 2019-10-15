const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
var ObjectId = require('mongoose').Types.ObjectId;
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
            console.log(truyen);
            res.render("home/noiDungTrangDetail", {
                layout: 'homeLayout.hbs',
                noiDung: truyen[0],
            })
        }
    });
})
module.exports = router;