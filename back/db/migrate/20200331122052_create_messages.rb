# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :body

      t.timestamps
    end
  end
end
