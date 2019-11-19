for (var slugTruyen = document.querySelector("#hidden-slug-truyen").value, listChapter = $(".all-list-chapter"), i = 0; i < listChapter.length; i++) {
    var chapName = listChapter[i].querySelector("input#hidden-chap-name").value,
        chapId = listChapter[i].querySelector("input#hidden-chap-id").value,
        urlChapTruyen = "/truyen-tranh/" + slugTruyen + "/chap-" + chapName + "/" + chapId;
    listChapter[i].querySelector("a#link-truyen").setAttribute("href", urlChapTruyen)
}
var listChapterAfterAddLink = $(".all-list-chapter");
function showMore() {
    var e = document.getElementById("dots"),
        t = document.getElementById("more"),
        r = document.getElementById("myBtn");
    "none" == e.style.display ? (e.style.display = "inline", r.innerHTML = "XEM THÊM", t.style.display = "none") : (e.style.display = "none", r.innerHTML = "ẨN ĐI", t.style.display = "inline")
}
document.querySelector(".btn-doc-tu-dau").setAttribute("href", listChapterAfterAddLink[listChapter.length - 1].querySelector("a#link-truyen").getAttribute("href")), document.querySelector(".btn-doc-moi-nhat").setAttribute("href", listChapterAfterAddLink[0].querySelector("a#link-truyen").getAttribute("href"));
for (var allTheLoai = theLoai.size, i = 0; i < allTheLoai; i++) {
    var a = $("<a>"),
        b = $("<div>").addClass("col-md-6");
    a.attr("href", "/tim-truyen/" + theLoai.get(i)[0]), a.attr("title", theLoai.get(i)[1]), a.text(theLoai.get(i)[1]), b.append(a), $(".list-cat .row").append(b)
}