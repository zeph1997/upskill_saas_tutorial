class ProfilesController < ApplicationController
   
   #GET request /users/:user_id/profile/new
   def new
       @profile = Profile.new
   end
   
   
end