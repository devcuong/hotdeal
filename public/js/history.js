if ($(".visited-comics-page").length && "undefined" != typeof Storage)
    if (void 0 !== localStorage["visited-comics"])
        if ((H = JSON.parse(localStorage["visited-comics"])).length > 0) {
            var L = $("<div>").addClass("row");
            for (b = H.length - 1; b >= 0; b--) {
                var XA = $("<div>").addClass("col-md-3 col-truyen"),
                    I = H[b],
                    O = $("<div>").addClass("item"),
                    R = $("<figure>").addClass("clearfix"),
                    W = $("<div>").addClass("image"),
                    U = $("<a>").attr("title", I.name).attr("href", I.url),
                    B = $("<img>").addClass("lazy").attr("alt", I.name).attr("data-original", I.image).attr("src", I.image),
                    G = $("<div>").addClass("view");
                $("<a>").addClass("visited-remove").attr("href", "#").data("id", I.id).html('<i class="fa fa-times"></i> Xóa').click(function(e) {
                    return e.preventDefault(), V($(this)), !1
                }).appendTo(G);
                U.append(B), W.append(U).append(G);
                var M = $("<figcaption>"),
                    _ = $("<h3>"),
                    P = $("<ul>"),
                    E = $("<li>").addClass("chapter clearfix"),
                    D = $("<a>").html('Đọc tiếp <i class="fa fa-angle-double-right"></i>').attr("href", I.chapterUrl),
                    N = $("<i>").text(I.chapterName).addClass("time"),
                    z = $("<a>").html(I.name).attr("title", I.name).attr("href", I.url);
                _.append(z), E.append(D).append(N), P.append(E), M.append(_).append(P), R.append(W).append(M), O.append(R), L.append(XA), XA.append(O)
            }
            $(".visited-comics-page").empty().append(L)
        } else $(".visited-comics-page").html("Bạn chưa đọc truyện nào.");
else $(".visited-comics-page").html("Bạn chưa đọc truyện nào.");