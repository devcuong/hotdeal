jQuery.ui.autocomplete.prototype._resizeMenu = function() {
    var ul = this.menu.element;
    ul.outerWidth(this.element.outerWidth());
}
$(function() {
    $("#search-input").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: 'post',
                url: "/tim-truyen/tu-khoa",
                dataType: "json",
                data: {
                    tuKhoa: request.term
                },
                success: function(data) {
                    response($.map(data, function(item) {
                        var url = '/truyen-tranh/' + item.slug_truyen + '/';
                        return {
                            label: item.ten_truyen,
                            url: url
                        }
                    }));
                }
            });
        },
        minlength: 2,
        select: function(event, ui) {
            window.location.href = ui.item.url;
        },
        open: function() {},
        close: function() {}
    });
});