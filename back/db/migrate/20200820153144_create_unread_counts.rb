class CreateUnreadCounts < ActiveRecord::Migration[6.0]
  def change
    create_table :unread_counts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.integer :count

      t.timestamps
    end
  end
end
