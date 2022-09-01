class SessionsController < ApplicationController

  def create
    if user = User.authenticate_with_credentials(params[:session][:email], params[:session][:password])
      session[:user_id] = user.id
      flash[:notice] = "Logged in successfully."
      
      # redirect_to '/'
    else
      flash.now[:notice] = "There was something wrong with your login details."
      # render 'new'
    end
  end
  def destroy
    session[:user_id] = nil
    flash[:notice] = "You have been logged out."
    # redirect_to root_path
  end

end
