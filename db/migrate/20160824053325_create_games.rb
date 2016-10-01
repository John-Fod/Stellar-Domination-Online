class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :host
      t.string :name
      t.integer :num_players, default: 2
      t.integer :ships_per_player, default: 3
      t.integer :cur_round, default: 0
      t.boolean :started, default: false
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
