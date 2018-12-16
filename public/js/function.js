
//SIGN UP REQUIREMENTS
function validatePassword(password){
    let passwordValid = false;

    let hasNumber = /\d/.test(password);
    let hasCapital = /[A-Z]/.test(password);
    let hasFourChar = password.length > 3;

    passwordValid = hasNumber && hasCapital && hasFourChar;

    (hasNumber) ? $('.number').addClass('green') : $('.number').removeClass('green');
    (hasCapital) ? $('.capital').addClass('green') : $('.capital').removeClass('green');
    (hasFourChar) ? $('.characters').addClass('green') : $('.characters').removeClass('green');
    
}

//REPEAT PASSWORD
function equalPassword(password){
    let passwordOne = $('#password1').val(); 
    let repeatPassword = $('#password2').val();
    let passwordEqual = passwordOne === repeatPassword;

    (passwordEqual) ? $('.equal').addClass('green') : $('.equal').removeClass('green');
    (!passwordEqual) ? $('#register-btn').addClass('inactive') : $('#register-btn').removeClass('inactive');
}


$('.add-history-btn').hide()
$(document).ready(function () {
    $('.offer').click(function(){
        $('.offer').hide()
        $('.search').hide()
        $('.add-history-btn').show()
    })      

    $(".item-subcontainer:odd").addClass("light");
    $(".item-subcontainer:even").addClass("dark");

    $(".item-history:odd").addClass("cyan");
    $(".item-history:even").addClass("yellow");
});

$(function () {
  $('[data-toggle="popover"]').popover()
})

var totalPrice = function() {
    let askingPrice = $('#asking-price').text();
    let passengerSeats = $('#passenger-seats').val();
    let totalPrice = askingPrice * passengerSeats;
    let availableSeats = $('#available-seats').text();
    let seatsRemaining = availableSeats - passengerSeats;
   
    $('#total-price').val(totalPrice); 
    $('#seat-remain').val(seatsRemaining);
}



var overCapacity = function(){
    let passengerSeats = $('#passenger-seats').val();
    let remainingSeats = $('#seat-remain').val();
    let availableSeats = $('#available-seats').text();
    console.log( parseInt(passengerSeats))
    console.log( parseInt(remainingSeats))
    console.log( parseInt(availableSeats))

    if(parseInt(passengerSeats) > availableSeats){
        alert('You cannot have more passenger(s) than the available seat(s)')
        $('#seat-remain').val(0);
        $('#passenger-seats').val(parseInt(availableSeats));
        totalPrice()
    } 

   
}


$('#passenger-seats')
    .keyup(totalPrice)
    .click(totalPrice)
    .keyup(overCapacity)
