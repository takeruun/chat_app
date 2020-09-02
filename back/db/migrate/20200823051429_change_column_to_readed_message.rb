class ChangeColumnToReadedMessage < ActiveRecord::Migration[6.0]
  def change
    change_column :readed_messages, :is_read, :boolean, default: false
    add_reference :readed_messages, :room, null: false, foreign_key: true, after: :message_id
  end
end
