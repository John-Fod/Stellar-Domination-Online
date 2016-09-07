class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.integer :user_id
      t.integer :game_id
      t.boolean :ready, default: false
      t.integer :cur_round, default: 0

      t.timestamps
    end
  end
end
