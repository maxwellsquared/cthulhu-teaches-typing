class AddDifficultyToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :difficulty, :string
  end
end
