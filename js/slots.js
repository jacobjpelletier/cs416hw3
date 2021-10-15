$(document).ready(function(){
    /** stored variables **/

    // value available to with which to make bets
    let wallet = 50;
    // value to bet
    let bet = 1;
    // toggle spin button color:
    let toggle = true;
    // array of available pics found in ../img
    const images = ["cherry.png", "grapes.png", "heart.png", "lemon.png", "orange.png", "seven.png", "strawberry.png"]
    // lost
    let lost = false;

    /** UTILITIES **/

    // toggleColor called by spin button event listener
    const toggleColor = function() {
        if(toggle) {
            $('#play-game-button').toggleClass("bg-primary");
            $('.play-game-button-part').toggleClass("text-light");
        }
    }

    // change message
    const changeMessage = function(msg) {
        $('#game-message').text(`${msg}`).addClass('text-danger').fadeTo(100, 0.1).fadeTo(200, 1.0);;

    }

    // changePics called by spin button event listener
    const changePics = function () {
        // 1. get 3 random numbers and corresponding images
        let randoImageArray = []
        for(let i = 0; i < 3; i++){
            let randoNum = randomNum(images.length);
            randoImageArray.push(images[randoNum]);
        }

        /* !!DEBUG!! */
        //console.log(randoImageArray);

        // 2. replace 3 img elements from DOM with 3 random images from randoImageArray
        let currentImages = $('img'); // array of current images
        for(let i = 0; i < 3; i++){
            currentImages[i].src="img/"+randoImageArray[i]; // replace each index of currentImages array with corresponding index of randoImageArray
        }
    }

    // randomNum called by ChangePics()
    const randomNum = function(max) {
        return Math.floor(Math.random() * (max));
    }

    // checkResults called by spin button event listener
    const checkResults = function() {
        // win condition === if all pictures match
        if ($('img')[0].src === $('img')[1].src && $('img')[1].src === $('img')[2].src){
            wallet += (bet*15);
            changeMessage('Congratulations! You won!')
            console.log('win');
        }
        // lose condition === all pictures do not match
        else {
            if (wallet - bet <= 0){
                lost = true;
            } else {
                wallet -= bet;
                changeMessage('You lost, spin again.')
                console.log('lose');
            }
        }
    }

    // updateVars called by checkResults()
    const updateVars = function() {
        // add values into HTML dynamically
        if (!lost) {
            $('#balance').text(`${wallet}`);
            $('#bet').text(`${bet} `);
        } else {
            $('#balance').text(`0 `);
            $('#bet').text(`${bet} `);
        }
    }

    /** event monitors **/

    updateVars();

    // decrease bet amount
    $('#less').click(function() {
        if (toggle === false) {
            toggle = true;
            toggleColor();
        }
        // make sure bet
        if (bet > 1) {
            $('#bet').text(`${--bet} `)
        }
    })

    // increase bet amount
    $('#more').click(function() {
        if (toggle === false) {
            toggle = true;
            toggleColor();
        }
        if (bet < wallet) {
            $('#bet').text(`${++bet} `)
        }
    })

    // spin slot
    $('#play-game').click(function () {
        if (!lost) {
            if (bet <= wallet) {
                // 1. change spin button color on click
                toggleColor();
                toggle = false;
                // 2. change pictures
                changePics();
                // 3. evaluate round results
                checkResults();
                // 4.
                updateVars();
            } else {
                changeMessage(`Invalid bet amount, you do not have enough money to bet $${bet}.`);
            }
        } else {
            changeMessage(`You lost all your money.`);
        }
    })

});


