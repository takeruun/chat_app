class CreateReadedMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :readed_messages do |t|
      t.boolean :is_read
      t.references :user, null: false, foreign_key: true
      t.references :message, null: false, foreign_key: true

      t.timestamps
    end
  end
end
