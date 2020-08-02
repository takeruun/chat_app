class CreateWorks < ActiveRecord::Migration[6.0]
  def change
    create_table :works do |t|
      t.references :user, null: false, foreign_key: true
      t.timestamp :start_time
      t.timestamp :end_time
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
