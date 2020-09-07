class RemoveColumnToMentionThreads < ActiveRecord::Migration[6.0]
  def change
    remove_column :mention_threads, :is_read
  end
end
