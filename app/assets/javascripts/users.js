/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load',function(){
    var theForm = $('#pro_form');    
    var submitBtn = $('#form-signup-btn');
    
    //Set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
    
    //When user clicks form submit btn
    submitBtn.click(function(event){
        //prevent default submission behavior
        event.preventDefault();
        
        //collect the credit card fields
        var ccNum = $('#card_number').val(); 
        var cvvNum = $('#card_code').val();
        var expMonth = $('#card_month').val();
        var expYear = $('#card_year').val();
        
        //send the card information to stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvvNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
        
    });
    
    
    
    //stripe will return a card token
    //inject card token as hidden field into form
    //submit form to our rails app

    
})
