$(document).ready(function(){
    /** stored variables **/

    // value available to with which to make bets
    let wallet = 50;

    // value to bet
    let bet = 1;

    /** event monitors **/

    // add values into HTML dynamically
    $('#balance').text(`${wallet}`);
    $('#bet').text(`${bet} `);

    // decrease bet amount
    $('#less').click(function() {
        $('#bet').text(`${bet--} `)
    })

    // increase bet amount
    $('#more').click(function() {
        $('#bet').text(`${bet++} `)
    })

});


