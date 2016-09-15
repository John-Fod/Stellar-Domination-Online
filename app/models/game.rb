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
    safe_game["full"] = self.full?
    safe_game["started"] = self.started?

    return safe_game
  end



  def state show_opponent_ships=false, cur_user=false
    game_state = self.attributes
    if cur_user
      player_of_logged_in_user = Player.where(["game_id = ?", self.id]).where(["user_id = ?", cur_user.id]).first
    end
    game_state["host"] = self.host.attributes.except('email', 'password_hash', 'password_salt', 'auth_token')
    game_state["players"] = []
    self.players.each do |player|
      cur_player = player.attributes
      cur_player["user"] = player.user.attributes.except('email', 'password_hash', 'password_salt', 'auth_token')
      cur_player["ships"] = []
      #-- SHOW ALL OF THE SHIPS IN THE GAME
      if show_opponent_ships == true
        player.ships.each do |ship|
          cur_player["ships"].push(ship.attributes)
        end
      #-- ONLY SHOW SHIPS OF THE cur_user
      else
        if player == cur_user
          Ship.where(["game_id = ?", self.id]).where(["player_id = ?", player_of_logged_in_user.id]).each do |ship|
            cur_player["ships"].push(ship.attributes)
          end
        end
      end
      game_state["players"].push(cur_player)
      #-------------------------------------------------------
      #-- IF THERE IS A LOGGED IN PLAYER, SEND THEIR USER INFO
      if player_of_logged_in_user
        game_state["logged_in_player"] = player_of_logged_in_user.attributes
        game_state["logged_in_player"]["user"] = cur_user.attributes.except('email', 'password_hash', 'password_salt', 'auth_token')
        game_state["logged_in_player"]["ships"] = []
        player_of_logged_in_user.ships.each do |ship|
          game_state["logged_in_player"]["ships"].push(ship.attributes)
        end

      end
    end
    game_state["frames"] = Ship.frames
    game_state["full"] = self.full?
    game_state["started"] = self.started?

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
    #-- Check if the game is full
    return false unless self.full?
    self.players.each do |player|
      advance_round = false if player.ready != true 
    end
    return advance_round
  end



  #-------------------------------------------
  #  FULL  -----------------------------------
  #    This checks if the game is full or not.
  def full?
    if self.players.size == self.num_players
      return true
    else
      return false
    end
  end


  #-------------------------------------------
  #  STARTED  --------------------------------
  #    This checks if a game has started by
  #  seeing if the cur_round is 0
  def started?
    if self.cur_round == 0
      return false
    else
      return true
    end
  end



end