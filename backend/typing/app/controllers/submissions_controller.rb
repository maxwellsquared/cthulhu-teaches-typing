class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end
  def create
    @submission = Submission.new(submission_params)
    if @submission.save
      render json: @submission
    else
      render json: @submission.errors.full_messages
  end
  end
  private
  def submission_params
    params.require(:submission).permit(:wpm, :users_id)
  end
end

# curl POST http://localhost:3000/submit -H 'Content-Type: application/json' -d '{"wpm":100,"users_id": 1}' -v
