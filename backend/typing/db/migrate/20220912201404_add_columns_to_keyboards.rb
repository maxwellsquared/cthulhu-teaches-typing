class AddColumnsToKeyboards < ActiveRecord::Migration[7.0]
  def change
    add_column :keyboards, :keyboard_type, :string
    add_column :keyboards, :color1, :string
    add_column :keyboards, :color2, :string
  end
end
