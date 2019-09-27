require("./models/db");
const express = require("express");
var app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const tintucController = require("./controllers/tintucController");
const mainController = require("./controllers/mainController");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var crypto = require("crypto");


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set("views", path.join(__dirname, "/views/"));
app.use(express.static(path.join(__dirname, "/public")));
app.use('/images', express.static(__dirname + "/public/images"));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("hbs", exphbs({
    extname: "hbs",
    defaultLayout: "adminLayout",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
        if: function(operand_1, operator, operand_2, options) {
            var operators = {
                    'eq': function(l, r) { return l == r; },
                    'noteq': function(l, r) { return l != r; },
                    'gt': function(l, r) { return Number(l) > Number(r); },
                    'lt': function(l, r) { return Number(l) < Number(r); },
                    'or': function(l, r) { return l || r; },
                    'and': function(l, r) { return l && r; },
                    '%': function(l, r) { return (l % r) === 0; }
                },
                result = operators[operator](operand_1, operand_2);

            if (result) return options.fn(this);
            else return options.inverse(this);
        },
        inc: function(value, options) {
            return parseInt(value) + 1;
        }

    }
}));


app.set("view engine", "hbs");

app.listen(3000, () => {
    console.log("Express server started at port : 3000");
});
// app.use("/noi-dung", trangConController);
app.use("/admin/tin-tuc", tintucController);
app.use("/", mainController);