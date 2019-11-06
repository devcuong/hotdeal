$(document).ready(function() {
    var syncedSecondary = true;
    $("#truyen-de-cu").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 2.5
            },
            600: {
                items: 2.5
            },
            1000: {
                items: 5
            }
        }
    });
});