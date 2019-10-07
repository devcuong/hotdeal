const mongoose = require('mongoose');
var truyenSchema = new mongoose.Schema({

    ten_chuong: {
        type: String,
        required: "this file is required"
    },
    ma_truyen: {
        type: String
    },
    thoi_gian_tao: {
        type: Date,
        default: Date.now
    },
    server_1: {
        type: String
    },
    server_2: {
        type: String
    },
    server_3: {
        type: String
    },
    server_4: {
        type: String
    },
    server_5: {
        type: String
    }

}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("Chapter", truyenSchema, "chapter");