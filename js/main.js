/**
 * Created by quantarius.ray on 7/17/2016.
 */

//******** Global Variables*******//
var $title = $('#title');
var $colors = $('#color');
var $design = $('#design');
var $payment = $('#payment');

//******* Immediately Invoked Functions*******//
$title.next().toggle();

for(var i = 1; i < Object.keys(activities).length; i++){
    var tr = "<tr>";
    tr += "<td>" + "<input type='checkbox'/></td>";
    tr+= "<td><label>" + activities[i].name + "</label></td>";
    tr+= "<td><span>" + activities[i].time + "</span></td>";
    tr+= "<td><span>" + "$" + activities[i].price + "</span></td>";
    tr+= "</td>";

    $('#activities').append(tr);
    addElements(activities[i], i);
}

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

//Condensed the functions to one big function that will catch the select event.

$('form .activities input[type="checkbox"]').click(function(event){
    var $jsFrameworks = $('#js-frameworks');
    var $express = $('#express');
    var $jslibs = $('#js-libs');
    var $node = $('#node');
    var $price = $('#total').next();

    if(this.name === $jsFrameworks[0].name){
        $express.prop("disabled", $jsFrameworks.prop("checked"));
    }else if(this.name === $express[0].name){
        $jsFrameworks.prop("disabled", $express.prop("checked"));
    }else if(this.name === $jslibs[0].name){
        $node.prop("disabled", $jslibs.prop("checked"));
    }else if(this.name === $node[0].name){
        $jslibs.prop("disabled", $node.prop("checked"));
    }

    for(var i = 0; i < activities.length; i++){
        if(this.name === activities[i].id){
            var activity = activities[i];
            if($(this).is(':checked')){
                activity.selected = true;
            }else{
                activity.selected = false;
            }
            break;
        }
    }

    var amount = getAmount($price.text());

    if(activity.selected){
        $price.text('$' + (amount + activity.price));
    }else if(!activity.selected){
        $price.text('$' + (amount - activity.price));
    }


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

function addElements(activity, i){
    var $select = $('tbody tr td input');
    var $label = $('tbody tr td label:nth-child(n+1)');
    $select[i].id = activity.id;
    $select[i].name = activity.id;
    $label[i].htmlFor = activity.id;
}

function getAmount(amount){
    return Number(amount.replace(/[^0-9\.]+/g,""));
}