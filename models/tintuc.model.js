const mongoose = require('mongoose');
var tinTucSchema = new mongoose.Schema({

    tieu_de: {
        type: String
    },
    slug_tieu_de: {
        type: String
    },
    nguoi_dang: {
        type: String
    },
    nguon_dang: {
        type: String
    },
    loai_tin: {
        type: String
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
mongoose.model("TinTuc", tinTucSchema, "tintuc");