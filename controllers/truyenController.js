const express = require("express");
var request = require("request");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const TheLoai = mongoose.model("TheLoai");
const utils = require("../utils/navRender.js");

router.get("/", (req, res) => {
    var q = Truyen.find();
    q.exec(function(err, docs) {
        if (!err) {
            res.render("admin/quanLyTruyen", {
                layout: 'defaultLayout.hbs',
                list: docs
            });
        }
    });
})
module.exports = router;