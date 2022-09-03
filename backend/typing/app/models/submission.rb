class Submission < ApplicationRecord
  validates :wpm, presence: true
  validates :users_id, presence: true
end
