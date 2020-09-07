class CreateOutgoingThreads < ActiveRecord::Migration[6.0]
  def change
    create_table :outgoing_threads do |t|
      t.references :user, null: false, foreign_key: true
      t.references :mention_thread, null: false, foreign_key: true

      t.timestamps
    end
  end
end
