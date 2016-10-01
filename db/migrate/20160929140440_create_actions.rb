class CreateActions < ActiveRecord::Migration[5.0]
  def change
    create_table :actions do |t|
      t.integer :game_id
      t.string :name
      t.integer :origin
      t.integer :target
      t.integer :round
      t.integer :hull_damage
      t.integer :shield_damage
      t.integer :hull_repair
      t.integer :shield_repair
      t.integer :energy_cost
      t.integer :energy_gain
      t.integer :delay

      t.timestamps
    end
  end
end
