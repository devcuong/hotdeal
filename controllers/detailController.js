const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
var ObjectId = require('mongoose').Types.ObjectId;
router.get("/:slugTruyen", (req, res) => {
    var slugTruyen = req.params.slugTruyen;
    var q = Truyen.findOne({ slug_truyen: slugTruyen });
    q.exec(function(err, doc) {
        if (!err) {
            res.render("home/noiDungTrangDetail", {
                layout: 'homeLayout.hbs',
                noiDung: doc
            });
        }
    });
})
module.exports = router;