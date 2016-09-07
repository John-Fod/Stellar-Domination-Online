class UpdateGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :started, :boolean, default: false
    add_column :games, :completed, :boolean, default: false
    add_column :games, :cur_round, :integer, default: 0
  end
end
