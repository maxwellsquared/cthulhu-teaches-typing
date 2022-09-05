class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end
  def show
    @submissions = Submission.order(wpm: :desc)
    render json: @submissions
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
# curl GET http://localhost:3000/leaderboard -H 'Content-Type: application/json' -v
