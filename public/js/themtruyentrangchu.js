/*themtruyentrangchu*/
$('.xem-them').click(function() {
    $('.loadingGif').show();

    var skip = $('.item-truyen').length;

    $.ajax({
        type: 'post',
        data: {
            skip: skip
        },
        dataType: 'json',
        url: '/load-them-truyen',
        success: function(response) {
            if (response.status == 1) {
                var listTruyen = response.listTruyen;

                var errorJs = "javascript:this.src='/themes/home/images/404-avatar.png';";

                var html = '';
                var truyen;
                var baChapMoi;

                for (var i = 0; i < listTruyen.length; i++) {
                    truyen = listTruyen[i];
                    baChapMoi = listTruyen[i]['chap_moi_ra'];
                    var A = $("<div>").addClass("col-md-3 col-6");
                    var B = $("<div>").addClass("item-truyen text-left");
                    var C = $("<figure>").addClass("clearfix");
                    var D = $("<div>").addClass("image");
                    var E = $("<a>").addClass("preview");
                    E.attr("title", truyen.ten_truyen);
                    E.attr("href", "/truyen-tranh/" + truyen.slug_truyen);
                    var F = $("<img>").addClass("lazy");
                    F.attr("src", "//images.weserv.nl/?url=" + encodeURIComponent(truyen.hinh_truyen) + "&w=200");
                    F.data("original", truyen.hinh_truyen);
                    F.attr("style", "display: inline ;");

                    var FF = $("<span>");
                    FF.attr("style", "display:none");
                    FF.attr("id", "hidden-ten-truyen");
                    FF.text(truyen.ten_truyen);

                    var FFF = $("<span>");
                    FFF.attr("style", "display:none");
                    FFF.attr("id", "hidden-the-loai");
                    FFF.text(truyen.the_loai);

                    var FFFF = $("<span>");
                    FFFF.attr("style", "display:none");
                    FFFF.attr("id", "hidden-luot-xem");
                    FFFF.text(truyen.luot_xem);

                    var FFFF = $("<span>");
                    FFFF.attr("style", "display:none");
                    FFFF.attr("id", "hidden-tac-gia");
                    FFFF.text(truyen.tac_gia);

                    var FFFFF = $("<span>");
                    FFFFF.attr("style", "display:none");
                    FFFFF.attr("id", "hidden-noi-dung");
                    FFFFF.text(truyen.noi_dung);

                    var G = $("<div>").addClass("view clearfix");
                    var H = $("<span>").addClass("pull-left");
                    var I1 = $("<i>").addClass("fa fa-eye");
                    var I2 = $("<i>").addClass("fa fa-comment");
                    var I3 = $("<i>").addClass("fa fa-heart");
                    var J1 = $("<span>").addClass("needs_to_format");
                    J1.text(listTruyen[i].luot_xem);
                    var J2 = $("<span>").addClass("needs_to_format");
                    J2.text(listTruyen[i].luot_danh_gia);
                    var J3 = $("<span>").addClass("needs_to_format");
                    J3.text(listTruyen[i].luot_theo_doi);
                    //Figcaption
                    var DF = $("<figcaption>");
                    var DFH3 = $("<H3>");
                    var DFH3A = $("<a>").addClass("jtip");
                    DFH3A.text(listTruyen[i].ten_truyen);
                    DFH3A.attr("href", "/truyen-tranh/" + listTruyen[i].slug_truyen);
                    var DFUL = $("<ul>");

                    for (var j = 0; j < baChapMoi.length; j++) {
                        var DFULLI = $("<li>").addClass("chapter clearfix");
                        var DFULLIA = $("<a>").addClass("sts");
                        DFULLIA.attr("title", "Chapter " + baChapMoi[baChapMoi.length - (j + 1)].ten_chuong);
                        DFULLIA.attr("href", "/truyen-tranh/" + truyen.ten_truyen);
                        DFULLIA.text("Chapter " + baChapMoi[baChapMoi.length - (j + 1)].ten_chuong);
                        var DFULLII = $("<i>").addClass("time needs_to_be_rendered");
                        DFULLII.attr("datetime", baChapMoi[baChapMoi.length - (j + 1)].thoi_gian_tao);
                        timeago.render(DFULLII, 'vi');
                        DFULLI.append(DFULLIA);
                        DFULLI.append(DFULLII);

                        DFUL.append(DFULLI)
                    }

                    H.append(I1);
                    H.append(J1);
                    H.append(I2);
                    H.append(J2);
                    H.append(I3);
                    H.append(J3);
                    G.append(H);
                    E.append(F);
                    E.append(FF);
                    E.append(FFF);
                    E.append(FFFF);
                    E.append(FFFFF);
                    E.append(G);
                    D.append(E);
                    C.append(D);
                    DFH3.append(DFH3A);
                    DF.append(DFH3);
                    DF.append(DFUL);
                    C.append(DF);
                    B.append(C);
                    A.append(B);
                    $(".truyen-item-home").append(A);
                }
            }

            $('.loadingGif').hide();
        }
    });
});
/*themtruyentrangchu*/