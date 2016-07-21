/**
 * Created by quantarius.ray on 7/17/2016.
 */

//******** Global Variables*******//
var $title = $('#title');
var $colors = $('#color');
var $design = $('#design');
var $jsFrameworks = $('#js-frameworks');
var $express = $('#express');
var $jslibs = $('#js-libs');
var $node = $('#node');
var $payment = $('#payment');

//******* Immediately Invoked Functions*******//
$title.next().toggle();
$colors.prev().toggle();
$colors.toggle();


//********** Validation ***********//
$('#name, #mail').blur(function(){
    $('form').validate();
});

$('form').validate({
    rules: {
        creditcard: {
            required: true,
            creditcard: true
        }
    }
});

//*********** Events *************//

//Show 'other' input when other is selected//
$title.change(function() {
    if ($title.val() === "other") {
        $title.next().toggle();
    }
});

//Show the color input and label when a design has been selected
$design.change(function(){
    if($colors.css("display") === 'none'){
        $colors.prev().toggle();
        $colors.toggle();
    }
    //when a design is selected, only show the t-shirt colors available to that design.
    if($design.val() === "js puns"){
        $colors.val('');
        $('#jsShirts').css("display", "none");
        $('#jsPuns').css("display", "block");
    }else{
        $colors.val('');
        $('#jsPuns').css("display", "none");
        $('#jsShirts').css("display", "block");
    }
});

//Each of these functions check to see if the activity that shares a time with it is checked. If it is, the other is disabled.
$jsFrameworks.click(function(){
    $express.prop("disabled", $jsFrameworks.prop("checked"));
});

$express.click(function(){
    $jsFrameworks.prop("disabled", $express.prop("checked"));
});

$jslibs.click(function(){
    $node.prop("disabled", $jslibs.prop("checked"));
});

$node.click(function(){
    $jslibs.prop("disabled", $node.prop("checked"));
});


//This toggles each of the payment types. Each shows a particular div that is associated with the value selected.
$payment.change(function(){
    var paymentVal = $payment.val();

    if(paymentVal === "bitcoin"){
        $('#bitCoin').removeClass("is-hidden");
        $('#credit-card, #payPal').addClass("is-hidden");
        $('#cc-num, #zip, #cvv').prop('required', false)
    }else if(paymentVal === "paypal"){
        $('#payPal').removeClass("is-hidden");
        $('#credit-card, #bitCoin').addClass("is-hidden");
        $('#cc-num, #zip, #cvv').prop('required', false)
    }else if(paymentVal === "credit card"){
        $('#credit-card').removeClass("is-hidden");
        $('#payPal, #bitCoin').addClass("is-hidden");
        $('#cc-num, #zip, #cvv').prop('required', true);
    }else{
        $('#payPal, #bitCoin, #credit-card').addClass("is-hidden");
        $('#cc-num, #zip, #cvv').prop('required', false)
    }
});

//When the submit is pressed, first, make sure that an activity has been chosen.
$('button').click(function(event){
    //Check to see if activity has been chosen
    var $form = $('form');
    var enableSubmit = checkActivities($form);

    if(!enableSubmit){
        event.preventDefault();
    }
});


//*********** Helper Functions *************//

function checkActivities(form){
    var boxChecked = false;
    $('form' + ' input[type="checkbox"]').each(function(){
        if($(this).is(":checked")) {
            boxChecked = true;
        }
    });

    if(!boxChecked){
        alert('You have not selected any activities to attend!');
    }

    return boxChecked;
}