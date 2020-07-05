class RmoveReferencesFromRoom < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :rooms, :users
    remove_reference :rooms, :user 
    remove_foreign_key :rooms, :messages
    remove_reference :rooms, :message
  end
end
