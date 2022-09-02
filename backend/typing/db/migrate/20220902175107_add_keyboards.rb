class AddKeyboards < ActiveRecord::Migration[7.0]
  def change
    create_table :keyboards do |t|
      t.string :name
      t.timestamps
    end
  end
end
