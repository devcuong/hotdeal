var slugTruyen = document.querySelector("#hidden-slug-truyen").value;
var listChapter = $(".all-list-chapter");
for (var i = 0; i < listChapter.length; i++) {
    var chapName = listChapter[i].querySelector("input#hidden-chap-name").value;
    var chapId = listChapter[i].querySelector("input#hidden-chap-id").value;
    var urlChapTruyen = "/truyen-tranh/" + slugTruyen + "/chap-" + chapName + "/" + chapId;
    listChapter[i].querySelector("a#link-truyen").setAttribute("href", urlChapTruyen);
}
var listChapterAfterAddLink = $(".all-list-chapter");
document.querySelector(".btn-doc-tu-dau").setAttribute("href", listChapterAfterAddLink[listChapter.length - 1].querySelector("a#link-truyen").getAttribute("href"));
document.querySelector(".btn-doc-moi-nhat").setAttribute("href", listChapterAfterAddLink[0].querySelector("a#link-truyen").getAttribute("href"));

function showMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display == "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "XEM THÊM";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "ẨN ĐI";
        moreText.style.display = "inline";
    }
}