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
                $("<a>").addClass("visited-remove").attr("href", "#").data("id", I.id).html('<i class="fa fa-times"></i> Xóa').click(function (a) {
                    return a.preventDefault(), V($(this)), !1
                }).appendTo(G), U.append(B), W.append(U).append(G);
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
if ($(".visited-comics").length && "undefined" != typeof Storage && void 0 !== localStorage["visited-comics"] && (H = JSON.parse(localStorage["visited-comics"])).length > 0) {
    var titleHistory = "<div class='title-history'><h4>Lịch sử đọc truyện<a class='view-all' href='/lich-su'>tất cả></a></h4></div>";
    L = $("<div>").addClass("box darkBox"), P = $("<ul>").addClass("list-unstyled");
    var J = 0;
    for (b = H.length - 1; b >= 0; b--) {
        I = H[b], E = $("<li>").addClass("clearfix");
        var F = $("<div>").addClass("t-item");
        E.append(F), U = $("<a>").addClass("thumb").attr("title", I.name).attr("href", I.chapterUrl), B = $("<img>").addClass("lazy").attr("alt", I.name).attr("data-original", I.image).attr("src", I.image), U.append(B), F.append(U), _ = $("<h3>").addClass("t-title"), z = $("<a>").html(I.name).attr("href", I.chapterUrl), _.append(z), F.append(_);
        var q = $("<p>").addClass("chapter"),
            K = $("<a>").html("Đọc tiếp " + I.chapterName + ' <i class="fa fa-angle-double-right"></i>').attr("href", I.chapterUrl),
            X = $("<span>").addClass("view pull-right");
        if ($("<a>").addClass("visited-remove").attr("href", "#").data("id", I.id).html('<i class="fa fa-times"></i> Xóa').click(function (a) {
            return a.preventDefault(), V($(this)), !1
        }).appendTo(X), q.append(K).append(X), F.append(q), P.append(E), ++J > 2) break
    }
    L.append(P), $(".visited-comics").empty(), $(".visited-comics").append(titleHistory), $(".visited-comics").append(L)
}
function V(a) {
    if ("undefined" != typeof Storage && void 0 !== localStorage["visited-comics"]) {
        var t = JSON.parse(localStorage["visited-comics"]),
            e = $(a).data("id");
        if (t.length > 0) {
            var i = t.map(function (a) {
                return a.id
            }).indexOf(e);
            i > -1 && (t.splice(i, 1), localStorage["visited-comics"] = JSON.stringify(t), $(a).parents(".item").remove(), $(a).parents("li").remove())
        }
    }
}
jQuery.ui.autocomplete.prototype._resizeMenu = function () {
    this.menu.element.outerWidth(this.element.outerWidth())
}, $(function () {
    $("#search-input").autocomplete({
        source: function (a, t) {
            $.ajax({
                type: "post",
                url: "/tim-truyen/tu-khoa",
                dataType: "json",
                data: {
                    tuKhoa: a.term
                },
                success: function (a) {
                    t($.map(a, function (a) {
                        var t = "/truyen-tranh/" + a.slug_truyen + "/";
                        return {
                            label: a.ten_truyen,
                            url: t
                        }
                    }))
                }
            })
        },
        minlength: 2,
        select: function (a, t) {
            window.location.href = t.item.url
        },
        open: function () { },
        close: function () { }
    })
});
for (var allTheLoai = theLoai.size, i = 0; i < allTheLoai; i++) {
    var a = $("<a>"),
        b = $("<div>").addClass("col-md-3 col-6");
    a.attr("href", "/tim-truyen/" + theLoai.get(i)[0]), a.attr("title", theLoai.get(i)[1]), a.text(theLoai.get(i)[1]), b.append(a), $("footer .row").append(b)
}
var listCategory = $(".dropdown-item");
for (i = 0; i < listCategory.length; i++) listCategory[i].setAttribute("href", "/tim-truyen/" + changeToSlug(listCategory[i].innerText.trim()));
for (var elementPerCol = theLoai.size / 4, lastElementCol = theLoai.size - 3 * Math.round(elementPerCol), col1 = elementPerCol, col2 = elementPerCol, col3 = elementPerCol, col4 = lastElementCol, j = (a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), 0); j < Math.round(col1); j++) {
    var c = $("<li>");
    (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c)
}
a.append(b), $(".multi-column .row").append(a);
for (a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), j = 12; j < Math.round(col1) + Math.round(col2); j++) {
    c = $("<li>");
    (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c)
}
a.append(b), $(".multi-column .row").append(a);
for (a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), j = 24; j < Math.round(col1) + Math.round(col2) + Math.round(col3); j++) {
    c = $("<li>");
    (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c)
}
a.append(b), $(".multi-column .row").append(a);
for (a = $("<div>").addClass("col-sm-3"), b = $("<ul>").addClass("multi-column-dropdown"), j = 36; j < Math.round(col1) + Math.round(col2) + Math.round(col3) + Math.round(col4); j++) {
    var d;
    c = $("<li>");
    (d = $("<a>").addClass("dropdown-item")).attr("href", "/tim-truyen/" + theLoai.get(j)[0]), d.text(theLoai.get(j)[1]), c.append(d), b.append(c)
}
a.append(b), $(".multi-column .row").append(a);
var btn = $("#back-home-button");
$(window).scroll(function () {
    $(window).scrollTop() > 300 ? btn.addClass("show") : btn.removeClass("show")
}), btn.on("click", function (a) {
    a.preventDefault(), $("html, body").animate({
        scrollTop: 0
    }, "300")
});
$(".xem-them").click(function () {
    $(".loadingGif").show();
    var e = $(".item-truyen").length;
    $.ajax({
        type: "post",
        data: {
            skip: e
        },
        dataType: "json",
        url: "/load-them-truyen",
        success: function (e) {
            if (1 == e.status)
                for (var t, a, n = e.listTruyen, i = 0; i < n.length; i++) {
                    t = n[i], a = n[i].chap_moi_ra;
                    var d = $("<div>").addClass("col-md-3 col-6"),
                        s = $("<div>").addClass("item-truyen text-left"),
                        p = $("<figure>").addClass("clearfix"),
                        l = $("<div>").addClass("image"),
                        r = $("<a>").addClass("preview");
                    r.attr("title", t.ten_truyen), r.attr("href", "/truyen-tranh/" + t.slug_truyen);
                    var o = $("<img>").addClass("lazy");
                    o.attr("src", "//images.weserv.nl/?url=" + encodeURIComponent(t.hinh_truyen) + "&w=200"), o.data("original", t.hinh_truyen), o.attr("style", "display: inline ;");
                    var h = $("<span>");
                    h.attr("style", "display:none"), h.attr("id", "hidden-ten-truyen"), h.text(t.ten_truyen);
                    var u, f = $("<span>");
                    f.attr("style", "display:none"), f.attr("id", "hidden-the-loai"), f.text(t.the_loai), (u = $("<span>")).attr("style", "display:none"), u.attr("id", "hidden-luot-xem"), u.text(t.luot_xem), (u = $("<span>")).attr("style", "display:none"), u.attr("id", "hidden-tac-gia"), u.text(t.tac_gia);
                    var v = $("<span>");
                    v.attr("style", "display:none"), v.attr("id", "hidden-noi-dung"), v.text(t.noi_dung);
                    var y = $("<div>").addClass("view clearfix"),
                        c = $("<span>").addClass("pull-left"),
                        g = $("<i>").addClass("fa fa-eye"),
                        x = $("<i>").addClass("fa fa-comment"),
                        m = $("<i>").addClass("fa fa-heart"),
                        _ = $("<span>").addClass("needs_to_format");
                    _.text(n[i].luot_xem);
                    var C = $("<span>").addClass("needs_to_format");
                    C.text(n[i].luot_danh_gia);
                    var w = $("<span>").addClass("needs_to_format");
                    w.text(n[i].luot_theo_doi);
                    var b = $("<figcaption>"),
                        T = $("<H3>"),
                        O = $("<a>").addClass("jtip");
                    O.text(n[i].ten_truyen), O.attr("href", "/truyen-tranh/" + n[i].slug_truyen);
                    for (var q = $("<ul>"), S = 0; S < a.length; S++) {
                        var j = $("<li>").addClass("chapter clearfix"),
                            I = $("<a>").addClass("sts");
                        I.attr("title", "Chapter " + a[a.length - (S + 1)].ten_chuong), I.attr("href", "/truyen-tranh/" + t.ten_truyen), I.text("Chapter " + a[a.length - (S + 1)].ten_chuong);
                        var k = $("<i>").addClass("time needs_to_be_rendered");
                        k.attr("datetime", a[a.length - (S + 1)].thoi_gian_tao), timeago.render(k, "vi"), j.append(I), j.append(k), q.append(j)
                    }
                    c.append(g), c.append(_), c.append(x), c.append(C), c.append(m), c.append(w), y.append(c), r.append(o), r.append(h), r.append(f), r.append(u), r.append(v), r.append(y), l.append(r), p.append(l), T.append(O), b.append(T), b.append(q), p.append(b), s.append(p), d.append(s), $(".truyen-item-home").append(d)
                }
            $(".loadingGif").hide()
        }
    })
}), xOffset = 10, yOffset = 30, $("a.preview").hover(function (e) {
    this.t = this.title, this.title = "";
    var t = this.querySelector("img.lazy").src,
        a = this.querySelector("span#hidden-the-loai").innerText,
        n = this.querySelector("span#hidden-luot-xem").innerText,
        i = this.querySelector("span#hidden-tac-gia").innerText,
        d = this.querySelector("span#hidden-noi-dung").innerText,
        s = ("" != this.t && this.t, "<div id='preview'>");
    s += "<div class='tooltip-box'>", s += "<div class='img-tooltip'>", s += "<img src='" + t + "' alt='Image preview' />", s += "</div>", s += "<div class='info-tooltip'>", s += "<p><label>Thể loại:</label>" + a, s += "</p>", s += "<p><label>Lượt xem:</label>" + n, s += "</p>", s += "<p><label>Tác giả:</label>" + i, s += "</p>", s += "</div>", s += "<div class='clearfix'>", s += "</div>", s += "<div>", s += "<p><label>Nội dung:</label>" + d, s += "</p>", s += "</div>", s += "</div>", s += "</div>", $("body").append(s), $("#preview").css("top", e.pageY - xOffset + "px").css("left", e.pageX + yOffset + "px").fadeIn("fast")
}, function () {
    this.title = this.t, $("#preview").remove()
}), $("a.preview").mousemove(function (e) {
    $("#preview").css("top", e.pageY - xOffset + "px").css("left", e.pageX + yOffset + "px")
});
var nodes = document.querySelectorAll(".needs_to_be_rendered");
timeago.render(nodes, "vi"), timeago.cancel();
var numberNodes = document.querySelectorAll(".needs_to_format");
for (i = 0; i < numberNodes.length; i++) numberNodes[i].innerHTML = numberNodes[i].innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
if ($("body").hasClass("view-chapter") && "undefined" != typeof Storage) {
    var c = $(".chapter-id").data("id");
    if (c) {
        if (void 0 !== localStorage["visited-chapters"]) {
            if (-1 == (H = JSON.parse(localStorage["visited-chapters"])).indexOf(c)) {
                if (H.push(c), H.length > 2e3)
                    for (var b = 0; b < 1500; b++) H.shift();
                localStorage["visited-chapters"] = JSON.stringify(H)
            }
        } else (O = []).push(c), localStorage["visited-chapters"] = JSON.stringify(O);
        var x = $(".breadcrumb li").eq(2).find("a"),
            A = $(".breadcrumb li").eq(3).find("a"),
            k = $('meta[itemprop="image"]').attr("content");
        if (x && A && k) {
            var S = $("#hidden-id-truyen").val();
            if (j = {
                id: S,
                image: k,
                name: x.find("span").html(),
                url: x.attr("href"),
                chapterName: A.find("span").html(),
                chapterUrl: A.attr("href")
            }, void 0 !== localStorage["visited-comics"]) {
                var H, T = (H = JSON.parse(localStorage["visited-comics"])).map(function (e) {
                    return e.id
                }).indexOf(S);
                if (T > -1 && H.splice(T, 1), H.push(j), H.length > 72)
                    for (b = 72; b < H.length; b++) H.shift();
                localStorage["visited-comics"] = JSON.stringify(H)
            } else (O = []).push(j), localStorage["visited-comics"] = JSON.stringify(O)
        }
    }
}
var proxy1 = "",
    proxy2 = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*&url=",
    proxy3 = "https://images.weserv.nl/?url=";
function changeClass(e, t) {
    var a = $(e);
    t.forEach(function (e, t) {
        e.classList.remove("btn-success")
    }), a[0].classList.add("btn-success")
}
var loadChapter = document.querySelectorAll("a.loadchapter");
function loadImageFromServer(e) {
    var t = document.querySelectorAll("img.img-truyen");
    switch (e) {
        case 1:
            t.forEach(function (e, t) {
                $(e).attr("src", $(e).data("src"))
            });
            break;
        case 2:
            t.forEach(function (e, t) {
                $(e).attr("src", proxy2 + encodeURIComponent($(e).data("src")))
            });
            break;
        case 3:
            t.forEach(function (e, t) {
                $(e).attr("src", proxy3 + encodeURIComponent($(e).data("src")))
            });
            break;
        case 4:
            t.forEach(function (e, t) {
                $(e).attr("src", $(e).data("cdn"))
            });
            break;
        case 5:
            t.forEach(function (e, t) {
                $(e).attr("src", proxy2 + encodeURIComponent($(e).data("cdn")))
            });
            break;
        case 6:
            t.forEach(function (e, t) {
                $(e).attr("src", proxy3 + encodeURIComponent($(e).data("cdn")))
            })
    }
}
function loadListChapter(e) {
    e.forEach(function (e, t) {
        var a = new Option("Chapter " + e.ten_chap, "/truyen-tranh/" + $("#hidden-name-truyen").val() + "/chap-" + e.ten_chap + "/" + e.id_chap),
            r = new Option("Chapter " + e.ten_chap, "/truyen-tranh/" + $("#hidden-name-truyen").val() + "/chap-" + e.ten_chap + "/" + e.id_chap);
        $("#id-Select-chapter").append(a), $("#hidden-select-chapter").append(r)
    });
    var t = window.location.pathname;
    $("#id-Select-chapter").val(t).prop("selected", !0), $("#hidden-select-chapter").val(t).prop("selected", !0), document.querySelector(".reading-control .prev-link").classList.add("disabled"), document.querySelector(".hidden-control-mobile .prev-link").classList.add("disabled"), document.querySelector(".reading-control .next-link").classList.add("disabled"), document.querySelector(".hidden-control-mobile .next-link").classList.add("disabled");
    var a = $("#id-Select-chapter option:selected"),
        r = a.prev(),
        n = a.next(),
        c = $("#hidden-select-chapter option:selected"),
        o = c.prev(),
        i = c.next();
    null != r && null != r.val() && (document.querySelector(".reading-control .prev-link").setAttribute("href", r.val()), document.querySelector(".reading-control .prev-link").classList.remove("disabled")), null != n && null != n.val() && (document.querySelector(".reading-control .next-link").setAttribute("href", n.val()), document.querySelector(".reading-control .next-link").classList.remove("disabled")), null != o && null != o.val() && (document.querySelector(".hidden-control-mobile .prev-link").setAttribute("href", o.val()), document.querySelector(".hidden-control-mobile .prev-link").classList.remove("disabled")), null != i && null != i.val() && (document.querySelector(".hidden-control-mobile .next-link").setAttribute("href", i.val()), document.querySelector(".hidden-control-mobile .next-link").classList.remove("disabled"))
}
loadChapter.forEach(function (e, t) {
    e.addEventListener("click", function () {
        changeClass(this, loadChapter)
    })
}), document.querySelector("a.changeserver").addEventListener("click", function () {
    var e = document.querySelector("a.btn-success[data-server]").nextElementSibling;
    null == e || e.classList.contains("hidden") ? (btnSuccessFirst = document.querySelectorAll("a.loadchapter")[0], changeClass(btnSuccessFirst, loadChapter)) : changeClass(e, loadChapter)
}), document.querySelector("a.change-server-mobile").addEventListener("click", function () {
    var e = document.querySelector("a.btn-success[data-server]").nextElementSibling;
    null == e || e.classList.contains("hidden") ? (btnSuccessFirst = document.querySelectorAll("a.change-server-mobile")[0], changeClass(btnSuccessFirst, loadChapter)) : changeClass(e, loadChapter)
}), $(".btn-success").attrchange({
    trackValues: !0,
    callback: function (e) {
        loadImageFromServer($(".btn-success").data("server"))
    }
}), document.querySelector("img.img-truyen").addEventListener("error", function () {
    document.querySelector("a.changeserver").click()
}), $(function () {
    $("#myFormSubmit").click(function (e) {
        e.preventDefault(), $.post("/truyen-tranh/error/" + $(".chapter-id").data("id"), $("#myForm").serialize(), function (e, t, a) {
            $("#myModal .close").click(), alert(e)
        })
    })
}), $(window).on("load", function () {
    var e = $("#hidden-id-truyen").val(),
        t = [];
    $.ajax({
        type: "post",
        data: {
            idTruyen: e
        },
        dataType: "json",
        url: "/truyen-tranh/all-chapter",
        success: function (e) {
            1 == e.success && (t = e.listChap, $("#id-Select-chapter").empty(), $("#hidden-select-chapter").empty(), loadListChapter(t))
        }
    })
}), $("#id-Select-chapter").on("change", function () {
    window.location.href = this.value
}), $("#hidden-select-chapter").on("change", function () {
    window.location.href = this.value
});
