const mongoose = require('mongoose');
var theLoaiSchema = new mongoose.Schema({

    ten_the_loai: {
        type: String
    },
    slug_the_loai: {
        type: String
    },
    mo_ta: {
        type: String
    }
}, {
        versionKey: false // You should be aware of the outcome after set to false
    });
mongoose.model("TheLoai", theLoaiSchema, "theloai");