class AddColumnToOutgoingThread < ActiveRecord::Migration[6.0]
  def change
    add_column :outgoing_threads, :is_read, :boolean, default: false, after: :mention_thread_id
  end
end
