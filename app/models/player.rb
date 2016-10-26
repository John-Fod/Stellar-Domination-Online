class Player < ApplicationRecord

  #-------------------------------
  #  VALIDATIONS  ----------------
  validates :game_id, presence: { message: "Every player needs a game."}
  validates :user_id, presence: { message: "Every player needs a user."}

  #-------------------------------
  #  ASSOCIATIONS  ---------------
  belongs_to :user
  belongs_to :game
  has_many :ships
  
  #-------------------------------
  #  DEFAULTS  -------------------


  #-------------------------------
  #  ACTIVE RECORD CALLBACKS  ----



  def declare_ready
    self.ready = true
    self.save
  end

end
