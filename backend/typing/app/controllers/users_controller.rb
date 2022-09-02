class UsersController < ApplicationController

  def new
    @user = User.new
  end
  def create
    @user = User.new(user_params)
    if @user.save
      # flash[:notice] = "User created."
      render json: @user
    else
      # flash[:alert] = "error created."
      render json: @user.errors.full_messages
  end
  end
  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end


end
