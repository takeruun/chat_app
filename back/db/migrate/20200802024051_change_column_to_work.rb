class ChangeColumnToWork < ActiveRecord::Migration[6.0]
  def change
    change_column :works, :start_time, :datetime
    change_column :works, :end_time, :datetime
  end
end
