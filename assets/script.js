// collapsable burger when website is mobile
$(document).ready(function () {

    $(".navbar-burger").click(function () {

        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
    let mood = 'light';
    let apiKey = 'sLjSEJizaotgTqWKmYtg8DxMVNSsjkqS';
    let limit = 10;
    let page = (Math.floor(Math.random() * 10)) + 1
    console.log(page)

    //variable for URL to api request
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + mood + '&limit=' + limit + '&api_key=' + apiKey;

    // ajax call with then promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < limit; i++) {
            console.log('Image: ' + i);
            $('#img' + i).attr('src', response.data[i].images.fixed_height_small.url);
        }
    });

    // pexels

    const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4"
    const queryURLp = 'https://api.pexels.com/v1/search?client=' + api_key + '&query=' + mood + '&per_page=' + limit + '&page=' + page

    function pexelSearch() {
        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: { "Authorization": api_key },

        }).then(function (responseP) {
            console.log(responseP)
            for (let i = 0; i < limit; i++) {
                console.log('Image: ' + i);
                $('#img' + i).attr('src', responseP.photos[i].src.large);
            }
        })
    }

    pexelSearch()

});

