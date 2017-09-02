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
        submitBtn.val("Processing").prop('disabled',true);
        
        //collect the credit card fields
        var ccNum = $('#card_number').val(); 
        var cvvNum = $('#card_code').val();
        var expMonth = $('#card_month').val();
        var expYear = $('#card_year').val();
        
        //Use stripe js library to check for card errors
        var error = false;
        
        //Validate card number
        if (!Stripe.card.validateCardNumber(ccNum)) {
            error = true;
            alert('The credit card number appears to be invalid');
        }
        
        //Validate CVC number
        if (!Stripe.card.validateCVC(cvvNum)) {
            error = true;
            alert('The cvc number appears to be invalid');
        }
        
        //Validate expiration date
        if (!Stripe.card.validateExpiry(expMonth,expYear)) {
            error = true;
            alert('The expiration date appears to be invalid');
        }
        
        if (error){
            //if there are card errors, dont send to stripe
            submitBtn.prop('disabled',false).val("Sign Up");
        } 
        else {
            //send the card information to stripe
            Stripe.createToken({
            number: ccNum,
            cvc: cvvNum,
            exp_month: expMonth,
            exp_year: expYear
            }, stripeResponseHandler);
        }
        return false;
    });
    
    //stripe will return a card token
    function stripeResponseHandler(status, response){
        //Get token from response
        var token = response.id;
        
        //inject card token as hidden field into form
        theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token));
        
        //submit form to our rails app
        theForm.get(0).submit();
    }
});
