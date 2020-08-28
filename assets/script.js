// collapsable burger when website is mobile
$(document).ready(function() {

    $(".navbar-burger").click(function() {

        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
    
});