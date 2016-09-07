class AddShipsPerPlayerToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :ships_per_player, :integer, default: 3
  end
end
