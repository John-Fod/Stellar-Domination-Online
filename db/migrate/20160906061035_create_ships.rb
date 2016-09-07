class CreateShips < ActiveRecord::Migration[5.0]
  def change
    create_table :ships do |t|
      t.integer :game_id
      t.integer :player_id
      t.string :frame
      t.integer :sheild_health
      t.integer :hull_health

      t.timestamps
    end
  end
end
