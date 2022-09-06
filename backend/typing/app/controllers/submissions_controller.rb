class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end

  def show # /api/leaderboard
    @submissions = Submission.joins(:user).select('submissions.*, users.name, users.id').order(wpm: :desc).limit(10)
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

  def history
    @submissions = Submission.where(user_id: params[:id]).order(created_at: :asc)
    render json: @submissions
  end

  private

  def submission_params
    params.require(:submission).permit(:wpm, :user_id)
  end
end

# curl POST http://localhost:3000/submit -H 'Content-Type: application/json' -d '{"wpm":100,"user_id": 1}' -v
# curl GET http://localhost:3000/api/leaderboard -H 'Content-Type: application/json' -v
# curl GET http://localhost:3000/api/user/1 -H 'Content-Type: application/json' -v
