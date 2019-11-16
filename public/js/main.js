$(document).ready(function() {
    var syncedSecondary = true;
    $("#truyen-de-cu").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    });
});
