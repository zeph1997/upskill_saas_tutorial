class ContactsController < ApplicationController
    
    #GET request to /contact-us
    #Show new contact form
    def new
        @contact = Contact.new
    end
    
    #POST request /contacts
    def create
        #Mass assignment of form fields to contact object
        @contact = Contact.new(contact_params)
        #Save contact object to database
        if @contact.save
            #store form fields via parameters into variables
            name = params[:contact][:name]
            email = params[:contact][:email]
            body = params[:contact][:comments]
            #email method and send email
            ContactMailer.contact_email(name, email, body).deliver
            #store success message into flash hash
            #and redirect to the new action
            flash[:success] = "Message sent."
            redirect_to new_contact_path
        else
            #if contact object doesnt save
            #store error to flash hash and redirect to new action
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
        end
    end
    
    private 
    #To collect data from form, we need to use
    #strong parameters and whitelist the form
    #fields
        def contact_params
            params.require(:contact).permit(:name, :email, :comments)
        end
end
