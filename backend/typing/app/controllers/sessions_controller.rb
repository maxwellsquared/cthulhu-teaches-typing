class SessionsController < ApplicationController
  def create
    if (@user = User.find_by(email: params[:session][:email].strip.downcase))
      if @user.email == params[:session][:email] && @user.password == params[:session][:password]
        @user = User.find_by(email: params[:session][:email].strip.downcase)
        # if the user exists AND the password entered is correct
        render json: @user, status: 200
      end
    else
      # if user's login doesn't work, send them back to the login form
      render json: 'There was something wrong with your login details.', status: 401
    end
  end

  def destroy
    session[:user_id] = nil
  end
end

# curl POST http://localhost:3000/login -H 'Content-Type: application/json' -d '{"password":"test","email":"adamgrharvey@gmail.com"}' -v
