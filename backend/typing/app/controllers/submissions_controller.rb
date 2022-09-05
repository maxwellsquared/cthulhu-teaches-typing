class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end
  def show # /api/leaderboard
    @submissions = Submission.joins(:user).select("submissions.*, users.*").order(wpm: :desc).limit(10)
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
    params.require(:submission).permit(:wpm, :user_id)
  end
end

# curl POST http://localhost:3000/submit -H 'Content-Type: application/json' -d '{"wpm":100,"user_id": 1}' -v
# curl GET http://localhost:3000/api/leaderboard -H 'Content-Type: application/json' -v
