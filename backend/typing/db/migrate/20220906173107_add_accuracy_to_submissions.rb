class AddAccuracyToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :accuracy, :integer
  end
end
