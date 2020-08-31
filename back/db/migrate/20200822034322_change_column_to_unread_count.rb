class ChangeColumnToUnreadCount < ActiveRecord::Migration[6.0]
  def change
    change_column :unread_counts, :count, :integer, default: 0
  end
end
