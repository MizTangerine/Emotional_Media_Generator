$(document).ready(function () {
    //scroll to top of page on refresh
    $(this).scrollTop(0);

    // global variables
    let limit = 10;
    let favorites = [];

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
                // $('#imgGif' + i).attr('src', response.data[i].images.downsized_medium.url);
                let cardEl = $('<div>').attr({
                    'class': 'card'
                });
                let cardButtonEl = $('<button>').attr({
                    'class': 'img-Btn far fa-heart',
                });
                let cardImgEl = $('<div>').attr({
                    'class': 'card-image'
                });
                let figureEl = $('<figure>').attr({
                    'class': 'image is-16by9 is-covered'
                });
                let imgEl = $('<img>').attr({
                    'id': 'img' + [i],
                    'src': response.data[i].images.downsized_medium.url,
                    'alt': response.data[i].title
                });
                let cardContEl = $('<div>').attr({
                    'class': 'card-content'
                });
                let itemTitleEl = $('<div>').attr({
                    'class': 'item__title'
                });
                let titleEl = $('<a>').attr({
                    'href': response.data[i].embed_url,
                    'target': '_blank '
                }).text(response.data[i].title + ' Powered By GIPHY');

                $('.giphy').append(cardEl);
                cardEl.append(cardImgEl);
                cardImgEl.append(figureEl);
                figureEl.append(imgEl);
                cardEl.append(cardContEl);
                cardContEl.append(cardButtonEl);
                cardContEl.append(itemTitleEl);
                itemTitleEl.append(titleEl);
            };

            saveToFavorites();
        });

    }
    //function to return pexel images
    function pexelSearch(mood) {

        let page = (Math.floor(Math.random() * 15)) + 1;
        const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4";
        const queryURLp = 'https://api.pexels.com/v1/search?client=' + api_key + '&query=' + mood + '&per_page=' + limit + '&page=' + page;

        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: {
                "Authorization": api_key
            },
        }).then(function (responseP) {
            for (let i = 0; i < limit; i++) {

                let cardEl = $('<div>').attr({
                    'class': 'card'
                });
                let cardButtonEl = $('<button>').attr({
                    'class': 'img-Btn far fa-heart'
                });
                let cardImgEl = $('<div>').attr({
                    'class': 'card-image'
                });
                let figureEl = $('<figure>').attr({
                    'class': 'image is-16by9 is-covered'
                });
                let imgEl = $('<img>').attr({
                    'id': 'img' + [i],
                    'src': responseP.photos[i].src.medium,
                    'alt': mood + [i],
                    'label': 'Photo by ' + responseP.photos[i].photographer + ' on Pexels'
                });
                let cardContEl = $('<div>').attr({
                    'class': 'card-content'
                });
                let itemTitleEl = $('<div>').attr({
                    'class': 'item__title'
                });
                let titleEl = $('<a>').attr({
                    'href': responseP.photos[i].photographer_url,
                    'target': '_blank '
                }).text('Photo by ' + responseP.photos[i].photographer + ' on Pexels');

                $('.pexels').append(cardEl);
                cardEl.append(cardImgEl);
                cardImgEl.append(figureEl);
                figureEl.append(imgEl);
                cardEl.append(cardContEl);
                cardContEl.append(cardButtonEl);
                cardContEl.append(itemTitleEl);
                itemTitleEl.append(titleEl);

            };
            saveToFavorites();
        })
    }

    //function to return curated pexel images
    function pexelCurated() {
        let page = (Math.floor(Math.random() * 25)) + 1;

        const api_key = "563492ad6f9170000100000158308df764de4d088c4400082b559ea4";
        const queryURLp = 'https://api.pexels.com/v1/curated?per_page=' + limit + '&page=' + page;

        $.ajax({
            url: queryURLp,
            method: 'GET',
            headers: { "Authorization": api_key },
        }).then(function (responseC) {
            console.log(responseC);

            for (let i = 0; i < limit; i++) {

                let cardEl = $('<div>').attr({
                    'class': 'card'
                });
                let cardButtonEl = $('<button>').attr({
                    'class': 'img-Btn far fa-heart'
                });
                let cardImgEl = $('<div>').attr({
                    'class': 'card-image'
                });
                let figureEl = $('<figure>').attr({
                    'class': 'image is-16by9 is-covered'
                });
                let imgEl = $('<img>').attr({
                    'id': 'img' + [i], 'src': responseC.photos[i].src.medium, 'alt': 'Photo by ' + responseC.photos[i].photographer, 'label': 'Photo by ' + responseC.photos[i].photographer + ' on Pexels'
                });
                let cardContEl = $('<div>').attr({
                    'class': 'card-content'
                });
                let itemTitleEl = $('<div>').attr({
                    'class': 'item__title'
                });
                let titleEl = $('<a>').attr({
                    'href': responseC.photos[i].photographer_url, 'target': '_blank '
                })
                    .text('Photo by ' + responseC.photos[i].photographer + ' on Pexels');

                $('.random').append(cardEl);
                cardEl.append(cardImgEl);
                cardImgEl.append(figureEl);
                figureEl.append(imgEl);
                cardEl.append(cardContEl);
                cardContEl.append(cardButtonEl);
                cardContEl.append(itemTitleEl);
                itemTitleEl.append(titleEl);

            };

            saveToFavorites();
        })
    }


    //click listener will save current url to local storage
    function saveToFavorites() {
        $('.img-Btn').on('click', function (event) {
            $(event.target).attr({ 'class': 'img-Btn fa fa-heart' });
            newImageHistory = { 'URL': event.target.parentElement.parentElement.firstChild.firstChild.firstChild.attributes[1].value };
            favorites.unshift(newImageHistory);
            if (favorites.length > 10) {
                favorites.pop();
            };
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    }

    //remove saved image from favorites
    function removeFromFavorites() {
        $('.img-Btn').on('click', function (event) {
            let currentIndex = event.target.parentElement.parentElement.firstChild.firstChild.firstChild.attributes[0].value.charAt(3);
            favorites.splice(currentIndex, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            $(event.target).attr({ 'class': 'img-Btn far fa-heart' });
        });
    }

    //create new cards and display image for each url in favorites function
    function displayFavorites() {
        favorites = JSON.parse(localStorage.getItem('favorites'));
        console.log(favorites);

        for (let i = 0; i < favorites.length; i++) {
            console.log(favorites[i].URL);

            let cardEl = $('<div>').attr({
                'class': 'card'
            });
            let cardButtonEl = $('<button>').attr({
                'class': 'img-Btn fas fa-heart'
            });
            let cardImgEl = $('<div>').attr({
                'class': 'card-image'
            });
            let figureEl = $('<figure>').attr({
                'class': 'image is-16by9 is-covered'
            });

            let sourceEl = $('<a>').attr({
                'href': favorites[i].URL,
                'target': '_blank'
            })

            let imgEl = $('<img>').attr({
                'id': 'img' + [i],
                'src': favorites[i].URL,
                'alt': 'favorite_image_' + [i]
            });
            let cardContEl = $('<div>').attr({
                'class': 'card-content'
            });

            $('.favorites').append(cardEl);
            cardEl.append(cardImgEl);
            cardImgEl.append(figureEl);
            figureEl.append(sourceEl);
            sourceEl.append(imgEl);
            cardEl.append(cardContEl);
            cardContEl.append(cardButtonEl);

            if (favorites === null || favorites.length === 0) {
                $('#favoritesText').text('You have no saved images or gifs!');

            } else {
                $('#favoritesText').text('Here is a list of your saved images and gifs!');
                for (let i = 0; i < favorites.length; i++) {

                    let cardEl = $('<div>').attr({
                        'class': 'card'
                    });
                    let cardButtonEl = $('<button>').attr({
                        'class': 'img-Btn fas fa-heart'
                    });
                    let cardImgEl = $('<div>').attr({
                        'class': 'card-image'
                    });
                    let figureEl = $('<figure>').attr({
                        'class': 'image is-16by9 is-covered'
                    });
                    let imgEl = $('<img>').attr({
                        'id': 'img' + [i],
                        'src': favorites[i].URL,
                        'alt': 'favorite_image_' + [i]
                    });
                    let cardContEl = $('<div>').attr({
                        'class': 'card-content'
                    });

                    $('.favorites').append(cardEl);
                    cardEl.append(cardImgEl);
                    cardImgEl.append(figureEl);
                    figureEl.append(imgEl);
                    cardEl.append(cardContEl);
                    cardContEl.append(cardButtonEl);

                };
            };

            removeFromFavorites();
        }
    }

        //clear all picture cards
        function clearCards() {
            $('.pexels').empty();
            $('.giphy').empty();
            $('.random').empty();
            $('.favorites').empty();
        }
    });