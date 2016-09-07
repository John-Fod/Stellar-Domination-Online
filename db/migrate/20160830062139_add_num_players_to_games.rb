class AddNumPlayersToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :num_players, :integer, default: 2
  end
end
