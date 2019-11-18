/*dropdownmenu*/
var listCategory = $(".dropdown-item");
for (var i = 0; i < listCategory.length; i++) {
    listCategory[i].setAttribute("href", "/tim-truyen/" + changeToSlug(listCategory[i].innerText.trim()));
}
/*enddropdownmenu*/
/*loadmenu*/
var elementPerCol = theLoai.size / 4;
var lastElementCol = theLoai.size - (Math.round(elementPerCol) * 3);
var col1 = elementPerCol;
var col2 = elementPerCol;
var col3 = elementPerCol;
var col4 = lastElementCol;

/*col menu 1*/
var a = $("<div>").addClass("col-sm-3");
var b = $("<ul>").addClass("multi-column-dropdown");
for (var j = 0; j < Math.round(col1); j++) {
    var c = $("<li>");
    var d = $("<a>").addClass("dropdown-item");
    d.attr("href", "/tim-truyen/" + theLoai.get(j)[0]);
    d.text(theLoai.get(j)[1]);
    c.append(d);
    b.append(c);
}
a.append(b);
$(".multi-column .row").append(a);

/*col menu 2*/
var a = $("<div>").addClass("col-sm-3");
var b = $("<ul>").addClass("multi-column-dropdown");
for (var j = 12; j < Math.round(col1) + Math.round(col2); j++) {
    var c = $("<li>");
    var d = $("<a>").addClass("dropdown-item");
    d.attr("href", "/tim-truyen/" + theLoai.get(j)[0]);
    d.text(theLoai.get(j)[1]);
    c.append(d);
    b.append(c);
}
a.append(b);
$(".multi-column .row").append(a);

/*col menu 3*/
var a = $("<div>").addClass("col-sm-3");
var b = $("<ul>").addClass("multi-column-dropdown");
for (var j = 24; j < Math.round(col1) + Math.round(col2) + Math.round(col3); j++) {
    var c = $("<li>");
    var d = $("<a>").addClass("dropdown-item");
    d.attr("href", "/tim-truyen/" + theLoai.get(j)[0]);
    d.text(theLoai.get(j)[1]);
    c.append(d);
    b.append(c);
}
a.append(b);
$(".multi-column .row").append(a);

/*col menu 4*/
var a = $("<div>").addClass("col-sm-3");
var b = $("<ul>").addClass("multi-column-dropdown");
for (var j = 36; j < Math.round(col1) + Math.round(col2) + Math.round(col3) + Math.round(col4); j++) {
    var c = $("<li>");
    var d = $("<a>").addClass("dropdown-item");
    d.attr("href", "/tim-truyen/" + theLoai.get(j)[0]);
    d.text(theLoai.get(j)[1]);
    c.append(d);
    b.append(c);
}
a.append(b);
$(".multi-column .row").append(a);
/*endloadmenu*/