class CreateSubmissions < ActiveRecord::Migration[7.0]
  def change
    create_table :submissions do |t|
      t.integer :wpm
      t.timestamps
    end
  end
end
