$(document).ready(function () {
    //scroll to top of page on refresh
    $(this).scrollTop(0);

    // global variables
    let limit = 10;
    let favorites = [];
    let mediaDetailsArray = [];

    // collapsable burger when website is mobile
    $(".navbar-burger").click(function () {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    //this is for the hide/show
    const photoQuestion = $("#photo-question");
    const giphyQuestion = $("#giphy-question");
    const randomQuestion = $("#random-question");
    const favoritesDisplay = $("#favorites-display");

    photoQuestion.hide();
    giphyQuestion.hide();
    randomQuestion.hide();
    favoritesDisplay.hide();

    const emgHome = $("#emg-home");
    const heroText = $("#hero-text");

    $("#nav-photos,#hero-photos-btn").on("click", function () {
        heroText.hide();
        giphyQuestion.hide();
        randomQuestion.hide();
        photoQuestion.show();
        favoritesDisplay.hide();
        clearCards();
    });

    $("#nav-gif, #hero-gif-btn").on("click", function () {
        heroText.hide();
        giphyQuestion.show();
        randomQuestion.hide();
        photoQuestion.hide();
        favoritesDisplay.hide();
        clearCards();
    });

    $("#nav-random, #hero-random-btn").on("click", function () {
        heroText.hide();
        giphyQuestion.hide();
        randomQuestion.show();
        photoQuestion.hide();
        favoritesDisplay.hide();
        clearCards();
    });

    $("#nav-favorites").on("click", function () {
        heroText.hide();
        giphyQuestion.hide();
        randomQuestion.hide();
        photoQuestion.hide();
        favoritesDisplay.show();
        clearCards();
        displayFavorites();
    });

    emgHome.on("click", function () {
        heroText.show();
        giphyQuestion.hide();
        randomQuestion.hide();
        photoQuestion.hide();
        favoritesDisplay.hide();
        clearCards();
    });
    //hide show ends here

    //on button click set mood to button value
    $('#photo-btn').on('click', function (event) {
        clearCards();
        pexelSearch(event.target.dataset.name);
    });

    $('#gif-btn').on('click', function (event) {
        clearCards();
        giphySearch(event.target.textContent);
    });

    $('#random-btn').on('click', function () {
        clearCards();
        pexelCurated();
    });

    //function that returns 10 random gifs based on user input of mood
    function giphySearch(mood) {
        mediaDetailsArray.length = 0;

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

                mediaDetailsArray.push(new mediaDetails(mood, response.data[i].images.downsized_medium.url, response.data[i].title, response.data[i].embed_url, response.data[i].title, 'Giphy'));
            };
            displayCards('giphy', mediaDetailsArray);
            saveToFavorites();
        });

    }
    //function to return pexel images
    function pexelSearch(mood) {
        mediaDetailsArray.length = 0;

        let page = (Math.floor(Math.random() * 15)) + 1;
        const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4";
        const queryURLp = 'https://api.pexels.com/v1/search?client=' + api_key + '&query=' + mood + '&per_page=' + limit + '&page=' + page;

        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: {
                "Authorization": api_key
            },
        }).then(function (response) {
            for (let i = 0; i < limit; i++) {

                mediaDetailsArray.push(new mediaDetails(mood, response.photos[i].src.medium, response.photos[i].photographer, response.photos[i].photographer_url, response.photos[i].photographer, 'Pexels'));

            };
            displayCards('pexels', mediaDetailsArray);
            saveToFavorites();
        })
    }

    //function to return curated pexel images
    function pexelCurated() {
        mediaDetailsArray.length = 0;

        let page = (Math.floor(Math.random() * 25)) + 1;
        const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4";
        const queryURLp = 'https://api.pexels.com/v1/curated?per_page=' + limit + '&page=' + page;

        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: { "Authorization": api_key },
        }).then(function (response) {

            //store necessary details of each image to an array
            for (let i = 0; i < limit; i++) {

                mediaDetailsArray.push(new mediaDetails('Random', response.photos[i].src.medium, response.photos[i].photographer, response.photos[i].photographer_url, response.photos[i].photographer, 'Pexels'));

            };
            displayCards('random', mediaDetailsArray);
            saveToFavorites();
        })
    }

    //click listener will save media details object url to local storage
    function saveToFavorites() {
        $('.img-Btn').on('click', function (event) {
            $(event.target).attr({ 'class': 'img-Btn fa fa-heart' });
            const currentIndex = event.target.parentElement.parentElement.firstChild.firstChild.firstChild.attributes[0].value.charAt(3);
            favorites.unshift(mediaDetailsArray[currentIndex]);

            //only store 10 images/gifs - remove oldest if greater than 10
            if (favorites.length > 10) {
                favorites.pop();
            };
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    }

    //remove selected media from favorites and store in local storage
    function removeFromFavorites() {
        $('.img-Btn').on('click', function (event) {
            const currentIndex = event.target.parentElement.parentElement.firstChild.firstChild.firstChild.attributes[0].value.charAt(3);
            favorites.splice(currentIndex, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            $(event.target).attr({ 'class': 'img-Btn far fa-heart' });
        });
    }

    //create new cards and display image for each url in favorites function
    function displayFavorites() {
        favorites = JSON.parse(localStorage.getItem('favorites'));

        if (favorites === null || favorites.length === 0) {

            //since we empty #favovitesNotification if favorites array is empty, we need to create the divs for this display each time instead of hardcoding the html
            let noFavoritesEl = $('<div>').attr('class', 'notification is-light');
            let noFavoritesText = $('<div>').attr({
                'class': 'content is-large is is-centered',
                'id': 'favoritesText'
            });

            noFavoritesText.text('You have no saved images or gifs!');

            $('#favoritesNotification').append(noFavoritesEl);
            noFavoritesEl.append(noFavoritesText);

        } else {
            $("#favoritesNotification").empty();
            displayCards('favorites', favorites);
        };
        removeFromFavorites();
    }

    //clear all picture card divs
    function clearCards() {
        $('#slider').empty();
        $('.giphy').empty();
        $('.random').empty();
        $('.favorites').empty();
    }

    //constructor function to store media details for each generated image/gif
    function mediaDetails(mood, src, alt, href, title, api) {
        this.mood = mood;
        this.src = src;
        this.alt = alt;
        this.href = href;
        this.title = title;
        this.api = api;
    }

    //display image/gif cards based on the navBar link selected
    function displayCards(displayFrom, currentArray) {

        for (let i = 0; i < currentArray.length; i++) {

            let cardEl = $('<div>').attr({
                'class': 'card'
            });
            let cardImgEl = $('<div>').attr({
                'class': 'card-image'
            });
            let figureEl = $('<figure>').attr({
                'class': 'image is-16by9 is-covered'
            });
            let imgEl = $('<img>').attr({
                'id': 'img' + [i],
                'src': currentArray[i].src,
                'alt': currentArray[i].alt
            });
            let cardContEl = $('<div>').attr({
                'class': 'card-content'
            });

            let cardButtonEl;
            if (displayFrom === 'favorites') {
                cardButtonEl = $('<button>').attr({
                    'class': 'img-Btn fas fa-heart'
                });
            } else {
                cardButtonEl = $('<button>').attr({
                    'class': 'img-Btn far fa-heart'
                });
            }
            let itemTitleEl = $('<div>').attr({
                'class': 'item__title'
            });
            let titleEl = $('<a>').attr({
                'href': currentArray[i].href,
                'target': '_blank '
            });

            if (currentArray[i].api === 'Pexels') {
                titleEl.text('Photo by ' + currentArray[i].title + ' on Pexels');
            } else if (currentArray[i].api === 'Giphy') {
                titleEl.text(currentArray[i].title + ' Powered By GIPHY');
            };

            $('#slider').append(cardEl);
            cardEl.append(cardImgEl);
            cardImgEl.append(figureEl);
            figureEl.append(imgEl);
            cardEl.append(cardContEl);
            cardContEl.append(cardButtonEl);
            cardContEl.append(itemTitleEl);
            itemTitleEl.append(titleEl);
        };
    }
});