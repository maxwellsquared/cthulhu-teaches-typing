class KeyboardsController < ApplicationController
  def new
    @keyboard = Keyboard.new
  end

  def create
    @keyboard = Keyboard.new(keyboard_params)
    if @keyboard.save
      render json: @keyboard
    else
      render json: @keyboard.errors.full_messages
    end
  end

  def show
    # select all keyboards for a user
    @keyboards = Keyboard.where(user_id: params[:id])
    render json: @keyboards
  end

  private

  def keyboard_params
    params.require(:keyboard).permit(:name, :keyboard_type, :color1, :color2, :user_id)
  end
end

# curl POST http://localhost:3000/keyboards/new -H 'Content-Type: application/json' -d '
#{
# "name": "Test Keyboard", 
# "keyboard_type": "full", 
# "color1": "red", 
# "color2": "green", 
# "user_id": 1}' -v
#
#
# curl GET http://localhost:3000/keyboards/1 -H 'Content-Type: application/json' -v
