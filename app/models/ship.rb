class Ship < ApplicationRecord

  self.default_scope{order('id DESC')}

  #-------------------------------
  #  VALIDATIONS  ----------------
  validates :game_id, presence: { message: "Every ship needs a game."}
  validates :player_id, presence: { message: "Every ships needs a player."}

  #-------------------------------
  #  ASSOCIATIONS  ---------------
  belongs_to :player
  belongs_to :game

  @@frames = {
  	#--  BATTLESHIP
  	:battleship => {
  	  :name => "battleship",
  	  :max_hull_integrity => 1000,
  	  :abilities => [
  	  	"cannon_volley",
  	  	"broadside"
  	  ]
  	},
  	#--  CRUISER
  	:cruiser => {
  	  :name => "cruiser",
  	  :max_hull_integrity => 500,
  	  :abilities => [
  	  	"cannon_volley",
  	  	"broadside"
  	  ]
  	}
  }

  def self.frames
  	@@frames
  end

  def self.valid_frames
  	frames = []
  	Ship.frames.each do |key, value|
      frames.push(value[:name])
  	end
  	return frames
  end

  def abilities
    Ship.frames[self.frame.parameterize.underscore.to_sym][:abilities]
  end


end
