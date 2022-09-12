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

  def destroy
    # destroy a single keyboard and all its submissions
    Keyboard.find(params[:id]).destroy
    Submission.where(keyboard_id: params[:id]).destroy_all
  end

  private

  def keyboard_params
    params.require(:keyboard).permit(:name, :user_id)
  end
end

# curl POST http://localhost:3000/keyboards/new -H 'Content-Type: application/json' -d '{"name": "Test Keyboard","user_id": 1}' -v
# curl GET http://localhost:3000/keyboards/1 -H 'Content-Type: application/json' -v
