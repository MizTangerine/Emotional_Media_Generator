// collapsable burger when website is mobile
$(document).ready(function () {

    $(".navbar-burger").click(function () {

        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    let limit = 10;

    //function that returns 10 random gifs based on user input of mood
    function returnRandomGIFS(mood) {
        let apiKeyGiphy = 'sLjSEJizaotgTqWKmYtg8DxMVNSsjkqS';
        let offset = Math.floor(Math.random() * 2000);

        //variable for URL to api request
        const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + mood + '&limit=' + limit + '&offset=' + offset + '&api_key=' + apiKeyGiphy;

        // ajax call with then promise
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //display each of the 10 images in a div
            for (let i = 0; i < limit; i++) {
                $('#imgGif' + i).attr('src', response.data[i].images.downsized_medium.url);
            }
        });

    }

    function pexelSearch(mood) {

        let page = (Math.floor(Math.random() * 7)) + 1
        const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4"
        const queryURLp = 'https://api.pexels.com/v1/search?client=' + api_key + '&query=' + mood + '&per_page=' + limit + '&page=' + page

        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: { "Authorization": api_key },

        }).then(function (responseP) {
            console.log(responseP)
            for (let i = 0; i < limit; i++) {

                let cardEl = $('<div>').attr({ 'class': 'card' })
                let cardImgEl = $('<div>').attr({ 'class': 'card-image' })
                let figureEl = $('<figure>').attr({ 'class': 'image is-16by9 is-covered' })
                let imgEl = $('<img>').attr({ 'id': 'img' + [i], 'src': responseP.photos[i].src.medium, alt: mood + [i], 'label': 'Photo by ' + responseP.photos[i].photographer + ' on Pexels' })
                let cardContEl = $('<div>').attr({ 'class': 'card-content' })
                let itemTitleEl = $('<div>').attr({ 'class': 'item__title' })
                let titleEl = $('<a>').attr({ 'href': responseP.photos[i].photographer_url, 'target': '_blank ' }).text('Photo by ' + responseP.photos[i].photographer + ' on Pexels')

                $('#slider').append(cardEl)
                cardEl.append(cardImgEl)
                cardImgEl.append(figureEl)
                figureEl.append(imgEl)

                cardEl.append(cardContEl)
                cardContEl.append(itemTitleEl)
                itemTitleEl.append(titleEl)
            }
        })
    }

    //on button click set mood to button value
    $('#photo-btn').on('click', function (event) {
        pexelSearch(event.target.textContent);
    });

    $('#gif-btn').on('click', function (event) {
        returnRandomGIFS(event.target.textContent);
    });

});
