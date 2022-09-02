class AddUsersToKeyboards < ActiveRecord::Migration[7.0]
  def change
    add_reference :keyboards, :users, index: true, foreign_key: true
  end
end
