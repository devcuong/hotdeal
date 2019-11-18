if ($("body").hasClass("view-chapter") && "undefined" != typeof Storage) {
    var c = $(".chapter-id").data("id");
    if (c) {
        if (void 0 !== localStorage["visited-chapters"]) {
            if (-1 == (H = JSON.parse(localStorage["visited-chapters"])).indexOf(c)) {
                if (H.push(c), H.length > 2e3)
                    for (var b = 0; b < 1500; b++) H.shift();
                localStorage["visited-chapters"] = JSON.stringify(H)
            }
        } else {
            (O = []).push(c), localStorage["visited-chapters"] = JSON.stringify(O);
        }
        var x = $(".breadcrumb li").eq(2).find("a"),
            A = $(".breadcrumb li").eq(3).find("a"),
            k = $('meta[itemprop="image"]').attr("content");
        if (x && A && k) {
            var S = $("#hidden-id-truyen").val();
            j = {
                id: S,
                image: k,
                name: x.find("span").html(),
                url: x.attr("href"),
                chapterName: A.find("span").html(),
                chapterUrl: A.attr("href")
            };
            if (void 0 !== localStorage["visited-comics"]) {
                var H, T = (H = JSON.parse(localStorage["visited-comics"])).map(function(e) {
                    return e.id
                }).indexOf(S);
                if (T > -1 && H.splice(T, 1), H.push(j), H.length > 72)
                    for (b = 72; b < H.length; b++) H.shift();
                localStorage["visited-comics"] = JSON.stringify(H)
            } else {
                (O = []).push(j), localStorage["visited-comics"] = JSON.stringify(O)
            }
        }
    }
}

// server truyện
var proxy1 = "";
var proxy2 = 'https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*&url=';
var proxy3 = 'https://images.weserv.nl/?url=';

function changeClass(selector, otherSelector) {
    var sel = $(selector);
    otherSelector.forEach(function myFunction(item, index) {
        item.classList.remove("btn-success");
    });
    sel[0].classList.add("btn-success");
}

var loadChapter = document.querySelectorAll('a.loadchapter');
loadChapter.forEach(function myFunction(item, index) {
    item.addEventListener("click", function() {
        changeClass(this, loadChapter);
    });
});

// change server desktop
document.querySelector("a.changeserver").addEventListener("click", function() {
    var btnSuccess = document.querySelector("a.btn-success[data-server]").nextElementSibling;
    if (btnSuccess != null && !btnSuccess.classList.contains("hidden")) {
        changeClass(btnSuccess, loadChapter);
    } else {
        btnSuccessFirst = document.querySelectorAll("a.loadchapter")[0];
        changeClass(btnSuccessFirst, loadChapter);
    }

})

// change server mobile
document.querySelector("a.change-server-mobile").addEventListener("click", function() {
    var btnSuccess = document.querySelector("a.btn-success[data-server]").nextElementSibling;
    if (btnSuccess != null && !btnSuccess.classList.contains("hidden")) {
        changeClass(btnSuccess, loadChapter);
    } else {
        btnSuccessFirst = document.querySelectorAll("a.change-server-mobile")[0];
        changeClass(btnSuccessFirst, loadChapter);
    }

})

function loadImageFromServer(dataServer) {
    var selectorTruyen = document.querySelectorAll("img.img-truyen");
    switch (dataServer) {
        case 1:
            selectorTruyen.forEach(function myFunction(item, index) {
                $(item).attr('src', $(item).data("src"));
            });
            break;
        case 2:
            selectorTruyen.forEach(function myFunction(item, index) {
                $(item).attr('src', proxy2 + encodeURIComponent($(item).data("src")));
            });
            break;
        case 3:
            selectorTruyen.forEach(function myFunction(item, index) {
                $(item).attr('src', proxy3 + encodeURIComponent($(item).data("src")));
            });
            break;
        case 4:
            selectorTruyen.forEach(function myFunction(item, index) {
                $(item).attr('src', $(item).data("cdn"));
            });
            break;
        case 5:
            selectorTruyen.forEach(function myFunction(item, index) {
                $(item).attr('src', proxy2 + encodeURIComponent($(item).data("cdn")));
            });
            break;
        case 6:
            selectorTruyen.forEach(function myFunction(item, index) {
                $(item).attr('src', proxy3 + encodeURIComponent($(item).data("cdn")));
            });
            break;
        default:
            // code block
    }
}
// event khi add class
$('.btn-success').attrchange({
    trackValues: true,
    callback: function(event) {
        loadImageFromServer($('.btn-success').data("server"))
    }
});

// khi load image truyện bị lỗi
document.querySelector("img.img-truyen").addEventListener("error", function() {
    document.querySelector("a.changeserver").click();
});
//
$(function() {
    $('#myFormSubmit').click(function(e) {
        e.preventDefault();
        $.post('/truyen-tranh/error/' + $(".chapter-id").data("id"),
            $('#myForm').serialize(),
            function(data, status, xhr) {
                $("#myModal .close").click()
                alert(data);
            });
    });
});
$(window).on("load", function() {
        var c = $("#hidden-id-truyen").val();
        var listChap = [];
        $.ajax({
            type: 'post',
            data: {
                idTruyen: c
            },
            dataType: 'json',
            url: "/truyen-tranh/all-chapter",
            success: function(response) {
                //var returnedData = JSON.parse(response);
                if (response.success == true) {
                    listChap = response.listChap;
                    $("#id-Select-chapter").empty();
                    $("#hidden-select-chapter").empty();
                    loadListChapter(listChap);
                }
            }
        });

    })
    // change chapter nav desktop
$('#id-Select-chapter').on('change', function() {
    window.location.href = this.value;
});

// change chapter nav mobile
$('#hidden-select-chapter').on('change', function() {
    window.location.href = this.value;
});

function loadListChapter(listChap) {
    listChap.forEach(function myFunction(item, index) {
        var itemSelection = new Option("Chapter " + item.ten_chap, "/truyen-tranh/" + $("#hidden-name-truyen").val() + "/chap-" + item.ten_chap + "/" + item.id_chap);
        var itemSelectionMobile = new Option("Chapter " + item.ten_chap, "/truyen-tranh/" + $("#hidden-name-truyen").val() + "/chap-" + item.ten_chap + "/" + item.id_chap);
        $("#id-Select-chapter").append(itemSelection);
        $("#hidden-select-chapter").append(itemSelectionMobile);
    })
    var pathname = window.location.pathname;
    $('#id-Select-chapter').val(pathname).prop('selected', true);
    $("#hidden-select-chapter").val(pathname).prop('selected', true);

    // set prev next link
    document.querySelector('.reading-control .prev-link').classList.add("disabled");
    document.querySelector('.hidden-control-mobile .prev-link').classList.add("disabled");
    document.querySelector('.reading-control .next-link').classList.add("disabled");
    document.querySelector('.hidden-control-mobile .next-link').classList.add("disabled");

    // desktop select chapter
    var chapSelected = $('#id-Select-chapter option:selected');
    var prevSelect = chapSelected.prev();
    var nextSelect = chapSelected.next();

    // mobile select chapter
    var mobileChapSelected = $('#hidden-select-chapter option:selected');
    var mobilePrevSelect = mobileChapSelected.prev();
    var mobileNextSelect = mobileChapSelected.next();

    // desktop link
    if (prevSelect != null && prevSelect.val() != null) {
        document.querySelector('.reading-control .prev-link').setAttribute("href", prevSelect.val());
        document.querySelector('.reading-control .prev-link').classList.remove("disabled");
    }
    if (nextSelect != null && nextSelect.val() != null) {
        document.querySelector('.reading-control .next-link').setAttribute("href", nextSelect.val());
        document.querySelector('.reading-control .next-link').classList.remove("disabled");
    }
    // mobile link
    if (mobilePrevSelect != null && mobilePrevSelect.val() != null) {
        document.querySelector('.hidden-control-mobile .prev-link').setAttribute("href", mobilePrevSelect.val());
        document.querySelector('.hidden-control-mobile .prev-link').classList.remove("disabled");
    }
    if (mobileNextSelect != null && mobileNextSelect.val() != null) {
        document.querySelector('.hidden-control-mobile .next-link').setAttribute("href", mobileNextSelect.val());
        document.querySelector('.hidden-control-mobile .next-link').classList.remove("disabled");
    };
}