$(document).ready(function(){
    /** STORED VARIABLES **/

    // value available to with which to make bets
    let wallet = 50;
    // value to bet
    let bet = 1;
    // toggle spin button color:
    let isRunning = false;
    // array of available pics found in ../img
    const images = ["cherry.png", "grapes.png", "heart.png", "lemon.png", "orange.png", "seven.png", "strawberry.png"]
    // lost (keeps track of when to stop the game)
    let lost = false;

    let index = 0;

    /** UTILITIES (note: do not relocate below event handlers) **/

    // toggleColor called by spin button event listener
    const toggleColor = function() {
        $('#play-game-button').toggleClass("bg-primary");
        $('.play-game-button-part').toggleClass("text-light");
    }

    // change message
    const changeMessage = function(msg) {
        $('#game-message').text(`${msg}`).addClass('text-danger').fadeTo(100, 0.1).fadeTo(200, 1.0);;

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
        if (isRunning === false) {
            // make sure bet is > 0
            if (bet > 1) {
                $('#bet').text(`${--bet} `)
            }
        }
    })

    // increase bet amount
    $('#more').click(function() {
        if (isRunning === false) {
            if (bet < wallet) {
                $('#bet').text(`${++bet} `)
            }
        }
    })

    // spin slot
    $('#play-game').click(function () {
        // as long as the game is not lost
        if (!lost) {
            // and as long as the bet is less than or equal to available funds
            if (bet <= wallet) {
                isRunning = true;
                if (isRunning) {
                    toggleColor();
                    (function () {
                        setTimeout((first) => {
                            console.log('a');
                            (function () {
                                // button click = game started
                                setTimeout((first) => {
                                    console.log(first);
                                    let timer1 = setInterval(() => {
                                        $('img')[0].src = `img/${images[index++ % images.length]}`;
                                    }, 100);
                                    setTimeout((second) => {
                                        console.log(second);
                                        clearInterval(timer1);
                                        let timer2 = setInterval(() => {
                                            $('img')[1].src = `img/${images[index++ % images.length]}`;
                                        }, 100)
                                        setTimeout((third) => {
                                            console.log(third);
                                            clearInterval(timer2);
                                            let timer3 = setInterval(() => {
                                                $('img')[2].src = `img/${images[index++ % images.length]}`;
                                                setTimeout(() => {
                                                    clearInterval(timer3);
                                                }, 1000);
                                            }, 100);
                                        }, 3000, 3);
                                    }, 2000, 2);
                                }, 50, 1);
                            })();
                            setTimeout((second) => {
                                console.log('b');
                                toggleColor();
                                checkResults();
                                updateVars();
                                isRunning = false;
                            }, 7000);
                        }, 100);
                    })();
                }
            } else {
                // prompt the user to bet a value less than or equal to available funds
                changeMessage(`Invalid bet amount, you do not have enough money to bet $${bet}.`);
            }
        } else {
            // inform the user of the bad news - game over
            changeMessage(`You lost all your money.`);
        }
    })
});


