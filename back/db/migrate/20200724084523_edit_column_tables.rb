class EditColumnTables < ActiveRecord::Migration[6.0]
  def change
    rename_column :rooms, :room_name, :name
    change_column :users, :password_digest, :string, after: :is_login
  end
end
