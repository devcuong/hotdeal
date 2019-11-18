/*truyendaxem*/
if ($(".visited-comics").length && ("undefined" != typeof Storage && void 0 !== localStorage["visited-comics"] && (H = JSON.parse(localStorage["visited-comics"])).length > 0)) {
    var titleHistory = "<div class='title-history'>" + "<h4>Lịch sử đọc truyện<a class='view-all' href='/lich-su'>tất cả></a></h4></div>";
    L = $("<div>").addClass("box darkBox"), P = $("<ul>").addClass("list-unstyled");
    var J = 0;
    for (b = H.length - 1; b >= 0; b--) {
        I = H[b], E = $("<li>").addClass("clearfix");
        var F = $("<div>").addClass("t-item");
        E.append(F);
        U = $("<a>").addClass("thumb").attr("title", I.name).attr("href", I.chapterUrl), B = $("<img>").addClass("lazy").attr("alt", I.name).attr("data-original", I.image).attr("src", I.image);
        U.append(B), F.append(U);
        _ = $("<h3>").addClass("t-title"), z = $("<a>").html(I.name).attr("href", I.chapterUrl);
        _.append(z), F.append(_);
        var q = $("<p>").addClass("chapter"),
            K = $("<a>").html("Đọc tiếp " + I.chapterName + ' <i class="fa fa-angle-double-right"></i>').attr("href", I.chapterUrl),
            X = $("<span>").addClass("view pull-right");
        $("<a>").addClass("visited-remove").attr("href", "#").data("id", I.id).html('<i class="fa fa-times"></i> Xóa').click(function(e) {
            return e.preventDefault(), V($(this)), !1
        }).appendTo(X);
        if (q.append(K).append(X), F.append(q), P.append(E), ++J > 2) break
    }
    L.append(P);
    $(".visited-comics").empty();
    $(".visited-comics").append(titleHistory);
    $(".visited-comics").append(L);

}

function V(e) {
    if ("undefined" != typeof Storage && void 0 !== localStorage["visited-comics"]) {
        var t = JSON.parse(localStorage["visited-comics"]),
            a = $(e).data("id");
        if (t.length > 0) {
            var r = t.map(function(e) {
                return e.id
            }).indexOf(a);
            r > -1 && (t.splice(r, 1), localStorage["visited-comics"] = JSON.stringify(t), $(e).parents(".item").remove(), $(e).parents("li").remove())
        }
    }
}
/*endtruyendaxem*/