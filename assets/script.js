// collapsable burger when website is mobile
$(document).ready(function () {

    $(".navbar-burger").click(function () {

        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
    
    let limit = 10;
    //function that returns 10 random gifs based on user input of mood
    function returnRandomGIFS() {
        let mood = 'scary';
        let apiKeyGiphy = 'sLjSEJizaotgTqWKmYtg8DxMVNSsjkqS';
        let offset = Math.floor(Math.random() * 2000);
    
        //variable for URL to api request
        const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + mood + '&limit=' + limit + '&offset=' + offset + '&api_key=' + apiKeyGiphy;
    
        // ajax call with then promise
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //display each of the 10 images in a div
            for (let i = 0; i < limit; i++) {
                $('#imgGif' + i).attr('src', response.data[i].images.fixed_height_small.url);
            }
        });

    }

    
    const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4"
    const queryURLp = 'https://api.pexels.com/v1/search?client=' + api_key + '&query=scary&per_page=10'
    
    function pexelSearch() {
        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: { "Authorization": api_key},
            Default: 10,
        }).then(function (responseP) {
            console.log(responseP)
            for (let i = 0; i < limit; i++) {
                console.log('Image: ' + i);
                $('#img' + i).attr('src', responseP.photos[i].src.small);
            }
        })
    }
    
    returnRandomGIFS();
    pexelSearch()

});
