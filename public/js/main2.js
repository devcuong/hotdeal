this.imagePreview = function() {
    /* CONFIG */
    xOffset = 10;
    yOffset = 30;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    $("a.preview").hover(function(e) {
            this.t = this.title;
            this.title = "";
            var imageHover = this.querySelector("img.lazy").src;
            var theLoaiTruyen = this.querySelector("span#hidden-the-loai").innerText;
            var luotXemTruyen = this.querySelector("span#hidden-luot-xem").innerText;
            var tacGiaTruyen = this.querySelector("span#hidden-tac-gia").innerText;
            var noiDungTruyen = this.querySelector("span#hidden-noi-dung").innerText;
            var c = (this.t != "") ? "<br/>" + this.t : "";
            var toolTipBox = "<div id='preview'>";
            toolTipBox += "<div class='tooltip-box'>";
            toolTipBox += "<div class='img-tooltip'>";
            toolTipBox += "<img src='" + imageHover + "' alt='Image preview' />";
            toolTipBox += "</div>"
            toolTipBox += "<div class='info-tooltip'>";
            toolTipBox += "<p><label>Thể loại:</label>" + theLoaiTruyen;
            toolTipBox += "</p>";
            toolTipBox += "<p><label>Lượt xem:</label>" + luotXemTruyen;
            toolTipBox += "</p>";
            toolTipBox += "<p><label>Tác giả:</label>" + tacGiaTruyen;
            toolTipBox += "</p>";
            toolTipBox += "</div>";
            toolTipBox += "<div class='clearfix'>";
            toolTipBox += "</div>";
            toolTipBox += "<div>";
            toolTipBox += "<p><label>Nội dung:</label>" + noiDungTruyen;
            toolTipBox += "</p>";
            toolTipBox += "</div>";
            toolTipBox += "</div>";
            toolTipBox += "</div>";
            $("body").append(toolTipBox);
            $("#preview")
                .css("top", (e.pageY - xOffset) + "px")
                .css("left", (e.pageX + yOffset) + "px")
                .fadeIn("fast");
        },
        function() {
            this.title = this.t;
            $("#preview").remove();
        });
    $("a.preview").mousemove(function(e) {
        $("#preview")
            .css("top", (e.pageY - xOffset) + "px")
            .css("left", (e.pageX + yOffset) + "px");
    });
};
// starting the script on page load
$(document).ready(function() {
    imagePreview();
});