class Submission < ApplicationRecord
  validates :wpm, presence: true
  validates :user_id, presence: true

  belongs_to :user
end
