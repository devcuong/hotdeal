/*loadfootertheloai*/
var allTheLoai = theLoai.size;
for (var i = 0; i < allTheLoai; i++) {
    var a = $("<a>");
    var b = $("<div>").addClass("col-md-3 col-6");
    a.attr("href", "/tim-truyen/" + theLoai.get(i)[0]);
    a.attr("title", theLoai.get(i)[1]);
    a.text(theLoai.get(i)[1]);
    b.append(a);
    $("footer .row").append(b);
}
/* endloadfootertheloai */