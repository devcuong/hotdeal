const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const tinTuc = mongoose.model("TinTuc");
// const utils = require("../utils/navRender.js");
// const stringHandle = require("../utils/stringHandle");
// var moment = require('moment');

router.get("/", (req, res) => {
    res.render("admin/quanLyTinTuc", {

    });
});

module.exports = router;