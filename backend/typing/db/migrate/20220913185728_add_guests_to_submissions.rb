class AddGuestsToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :guest_name, :string
  end
end
