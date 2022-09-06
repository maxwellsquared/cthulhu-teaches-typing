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

  private

  def keyboard_params
    params.require(:keyboard).permit(:name, :user_id)
  end
end

# curl POST http://localhost:3000/keyboards/new -H 'Content-Type: application/json' -d '{"name": "Test Keyboard","user_id": 1}' -v
