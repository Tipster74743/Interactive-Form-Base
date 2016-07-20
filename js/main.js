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


$payment.change(function(){
    var paymentVal = $payment.val();

    if(paymentVal === "bitcoin"){
        $('#bitCoin').removeClass("is-hidden");
        $('#credit-card, #payPal').addClass("is-hidden");
    }else if(paymentVal === "paypal"){
        $('#payPal').removeClass("is-hidden");
        $('#credit-card, #bitCoin').addClass("is-hidden");
    }else if(paymentVal === "credit card"){
        $('#credit-card').removeClass("is-hidden");
        $('#payPal, #bitCoin').addClass("is-hidden");
    }else{
        $('#payPal, #bitCoin, #credit-card').addClass("is-hidden");
    }
});
