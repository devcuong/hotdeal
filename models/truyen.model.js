const mongoose = require('mongoose');
var truyenSchema = new mongoose.Schema({


    ten_truyen: {
        type: String,
        required: "this file is required"
    },
    slug_truyen: {
        type: String
    },
    url_truyen: {
        type: String
    },
    trang_thai: {
        type: String
    },
    url_hinh: {
        type: String
    },
    so_chuong: {
        type: String
    },
    views: {
        type: String
    },

    danh_gia: {
        type: Number
    },

    update_time: {
        type: String
    },

    tac_gia: {
        type: String
    }

}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("Truyen", truyenSchema, "truyen");