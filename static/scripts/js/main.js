$(document).ready(function () {
    var activeClass = '_active';

    var menu = $('.menu');
    var hamburger = $('.hamburger');
    var body = $('body');

    $('.hamburger').bind('click', function () {
        [menu, hamburger, body].forEach(function (element) {
            element.toggleClass(activeClass);
        });
    });

    $(".menu__link").click(function () {
        [menu, hamburger, body].forEach(function (element) {
            element.removeClass(activeClass);
        });

        var elemID = '#' + $(this).attr('elem-id');

        $('html, body').animate({
            scrollTop: $(elemID).offset().top
        }, 1000);
    });
});