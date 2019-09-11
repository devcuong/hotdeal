$(document).ready(function () {
    var syncedSecondary = true;
    $("#product-uytin").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
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
                items: 4
            }
        }
    });
    $("#slide-product").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
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
                items: 4
            }
        }
    });
    $("#big").owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 1,
        nav: true,
        dots: false,
        responsiveRefreshRate: 200,
        navText: [
            '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
    });

});