const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/xedaily", { useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (!err) {
        console.log("MongoDB Connection Succeeded")
    } else {
        console.log("Error in DB connection: " + err)
    }
});

require("./tintuc.model");
require("./video.model");