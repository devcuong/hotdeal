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


module.exports = router;