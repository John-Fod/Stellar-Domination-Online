class Game < ApplicationRecord

  #-------------------------------
  #  VALIDATIONS  ----------------
  validates :name, presence: { message: "Please give your new game a name."}
  validates :host, presence: { message: "Every game requires a registered host. Are you logged in?"}

  #-------------------------------
  #  ASSOCIATIONS  ---------------
  belongs_to :host, class_name: "User", foreign_key: "host"
  has_and_belongs_to_many :users
  has_many :players
  has_many :ships

  #-------------------------------
  #  DEFAULTS  -------------------


  #-------------------------------
  #  ACTIVE RECORD CALLBACKS  ----



  def overview
    safe_game = self.attributes
    safe_game["host"] = self.host.attributes.except('email', 'password_hash', 'password_salt', 'auth_token')
    safe_game["players"] = []
    self.players.each do |player|
      cur_player = player.attributes
      cur_player["user"] = player.user.attributes.except('email', 'password_hash', 'password_salt', 'auth_token')
      game_state["players"].push(cur_player)
    end

    return safe_game
  end



  def state cur_player=nil
    game_state = self.attributes
    game_state["host"] = self.host.attributes.except('email', 'password_hash', 'password_salt', 'auth_token')
    game_state["players"] = []
    self.players.each do |player|
      cur_player = player.attributes
      cur_player["user"] = player.user.attributes.except('email', 'password_hash', 'password_salt', 'auth_token')
      cur_player["ships"] = []
      player.ships.each do |ship|
        cur_player["ships"].push(ship.attributes)
      end
      game_state["players"].push(cur_player)
    end
    game_state["frames"] = Ship.frames

    return game_state
  end


  #************************************************
  #ADD PLAYER
  #************************************************
  #DESCRIPTION  -----------------------------------
  #  Creates a Player object and adds it to the
  #game. It also adds a user to the game and to the
  #newly created Player object
  #INPUT  -----------------------------------------
  #  user[User]: The user who will join the game
  def add_player joiningUser
    self.users << joiningUser
    newPlayer = Player.new
    newPlayer.game = self
    newPlayer.user = joiningUser
    if newPlayer.save
      self.check_if_started
      #-- Make the ships for the player
      i = 0
      numShips = self.ships_per_player
      puts "--------- #{self.ships_per_player} --------"
      while i < numShips
        newShip = Ship.new
        newShip.player = newPlayer
        newShip.game = self
        newShip.frame = Ship.frames[0]["name"]
        newShip.save
        i = i + 1
      end
      return newPlayer
    else
      return false
    end
  end

  #--------------------------------------------
  #  GET PLAYERS FOR GAME STATE  --------------
  #    This returns a hash of the players in a
  #  game based on the person logged in and if
  #  the game is finished or not
  def get_players_for_game_state logged_in_user = nil
    players = []
    user_player = Player.where(["game_id = ?", self.id]).where(["user_id = ?", logged_in_user.id]).first
    non_user_players = Player.where(["game_id = ?", self.id]).where.not(["user_id = ?", logged_in_user.id])
    players.push(user_player)
    non_user_players.each do |p|
      players.push(p)
    end
    return players

  end


  def check_if_started
    if self.players.count >= self.num_players
      self.started = true
      return self if self.save
    end
  end

  def all_players_ready?
    advance_round = true
    self.players.each do |player|
      advance_round = false if player.ready != true 
    end
    return advance_round
  end




end