class AddKeyboardsToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_reference :submissions, :keyboards, index: true, foreign_key: true
  end
end
