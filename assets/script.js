// collapsable burger when website is mobile
$(document).ready(function () {

    //this is for the hide/show
    const photoQuestion = $("#photo-question");
    const giphyQuestion = $("#giphy-question");
    const randomQuestion = $("#random-question");

    photoQuestion.hide();
    giphyQuestion.hide();
    randomQuestion.hide();

    const emgHome = $("#emg-home");
    const heroText =$("#hero-text");

    $("#start-btn").on("click", function(){
        heroText.hide();
        photoQuestion.show();
    });

    $("#nav-photos").on("click", function(){
        heroText.hide();
        giphyQuestion.hide();
        randomQuestion.hide();
        photoQuestion.show();
    });

    $("#nav-gif").on("click", function(){
        heroText.hide();
        giphyQuestion.show();
        randomQuestion.hide();
        photoQuestion.hide();
    });

    $("#nav-random").on("click", function(){
        heroText.hide();
        giphyQuestion.hide();
        randomQuestion.show();
        photoQuestion.hide();
    });
    
    emgHome.on("click", function(){
        heroText.show();
        giphyQuestion.hide();
        randomQuestion.hide();
        photoQuestion.hide();
    });
    //hide show ends here





    let limit = 10;

    $(".navbar-burger").click(function () {

        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    //function that returns 10 random gifs based on user input of mood
    function gifySearch(mood) {
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
            console.log(response)
            for (let i = 0; i < limit; i++) {
                // $('#imgGif' + i).attr('src', response.data[i].images.downsized_medium.url);
                let cardEl = $('<div>').attr({ 'class': 'card' });
                let cardImgEl = $('<div>').attr({ 'class': 'card-image' });
                let figureEl = $('<figure>').attr({ 'class': 'image is-16by9 is-covered' });
                let btnEl = $('<button>').attr({ 'class': 'gif-btn' });
                let imgEl = $('<img>').attr({ 'id': 'img' + [i], 'src': response.data[i].images.downsized_medium.url, 'alt': response.data[i].title });
                let cardContEl = $('<div>').attr({ 'class': 'card-content' });
                let itemTitleEl = $('<div>').attr({ 'class': 'item__title' });
                let titleEl = $('<a>').attr({ 'href': response.data[i].embed_url, 'target': '_blank ' }).text(response.data[i].title + ' Powered By GIPHY');

                $('.giphy').append(cardEl);
                cardEl.append(cardImgEl);
                cardImgEl.append(figureEl);
                figureEl.append(btnEl);
                btnEl.append(imgEl);
                cardEl.append(cardContEl);
                cardContEl.append(itemTitleEl);
                itemTitleEl.append(titleEl);
            }
            gifLocalStorage()
        });

    }
    //function to return pexel images
    function pexelSearch(mood) {

        let page = (Math.floor(Math.random() * 7)) + 1;
        const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4";
        const queryURLp = 'https://api.pexels.com/v1/search?client=' + api_key + '&query=' + mood + '&per_page=' + limit + '&page=' + page;

        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: { "Authorization": api_key },
        }).then(function (responseP) {
            // console.log(responseP);
            for (let i = 0; i < limit; i++) {

                let cardEl = $('<div>').attr({ 'class': 'card' });
                let cardImgEl = $('<div>').attr({ 'class': 'card-image' });
                let figureEl = $('<figure>').attr({ 'class': 'image is-16by9 is-covered' });
                let btnEl = $('<button>').attr({ 'class': 'img-Btn' });
                let imgEl = $('<img>').attr({ 'id': 'img' + [i], 'src': responseP.photos[i].src.medium, 'alt': mood + [i], 'label': 'Photo by ' + responseP.photos[i].photographer + ' on Pexels' });
                let cardContEl = $('<div>').attr({ 'class': 'card-content' });
                let itemTitleEl = $('<div>').attr({ 'class': 'item__title' });
                let titleEl = $('<a>').attr({ 'href': responseP.photos[i].photographer_url, 'target': '_blank ' }).text('Photo by ' + responseP.photos[i].photographer + ' on Pexels');

                $('.pexels').append(cardEl);
                cardEl.append(cardImgEl);
                cardImgEl.append(figureEl);
                figureEl.append(btnEl);
                btnEl.append(imgEl);
                cardEl.append(cardContEl);
                cardContEl.append(itemTitleEl);
                itemTitleEl.append(titleEl);

            }
            pexelLocalStorage()
        })
    }

    //on button click set mood to button value
    $('#photo-btn').on('click', function (event) {
        pexelSearch(event.target.textContent);
        $('.pexels').empty();
        $('.giphy').empty();
    });

    $('#gif-btn').on('click', function (event) {
        gifySearch(event.target.textContent);
        $('.pexels').empty();
        $('.giphy').empty();
    });

    //click listener will save current image url to local storage
    let favorites = [];
    
    function pexelLocalStorage() {
        $('.img-Btn').on('click', function (event) {
            console.log('something')
            newImageHistory = { 'URL': event.target.attributes[1].value };
            console.log(newImageHistory);
            favorites.unshift(newImageHistory);
            console.log(favorites);
            localStorage.setItem('pictureHistory', JSON.stringify(favorites));
            console.log(localStorage.getItem('pictureHistory'));
        });
    }

    //click listener will save current gif url local storage
    function gifLocalStorage() {
        $('.gif-btn').on('click', function (event) {
            newGifHistory = { 'URL': event.target.attributes[1].value };
            console.log(newGifHistory);
            favorites.unshift(newGifHistory);
            console.log(favorites);
            localStorage.setItem('gifHistory', JSON.stringify(favorites));
            console.log(localStorage.getItem('gifHistory'));
        });
    }

});
