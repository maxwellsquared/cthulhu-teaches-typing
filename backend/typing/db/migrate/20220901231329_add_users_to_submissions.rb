class AddUsersToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_reference :submissions, :users, index: true, foreign_key: true
  end
end
