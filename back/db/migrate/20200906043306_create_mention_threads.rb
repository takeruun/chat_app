class CreateMentionThreads < ActiveRecord::Migration[6.0]
  def change
    create_table :mention_threads do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.string :content
      t.boolean :is_read

      t.timestamps
    end
  end
end
