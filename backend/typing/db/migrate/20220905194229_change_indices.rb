class ChangeIndices < ActiveRecord::Migration[7.0]
  def change
    remove_reference :submissions, :users, foreign_key: true, index: true
    remove_reference :keyboards, :users, foreign_key: true, index: true
    remove_reference :submissions, :keyboards, foreign_key: true, index: true
    add_reference :submissions, :user, index: true, foreign_key: true
    add_reference :submissions, :keyboard, index: true, foreign_key: true
    add_reference :keyboards, :user, index: true, foreign_key: true
  end
end
