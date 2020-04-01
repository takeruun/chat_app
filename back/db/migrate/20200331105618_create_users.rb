# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password
      t.string :icon
      t.boolean :is_login
      t.string :token

      t.timestamps
    end
  end
end
