class ApplicationController < ActionController::Base
  

  # ----------------------------------------------------
  # -------------------- STANDARDS ---------------------
  # @logged_in_user: the logged in user
  # @game: the game from the URL id/game_id
  # @ship: the ship from the URL id/ship_id
  # ----------------------------------------------------
  # These will be used in all of the controllers with
  # the same names to keep my code DRY.

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def logged_in_user
  	if cookies[:auth_token]
      return @logged_in_user ||= User.select("username, email, id").find_by(auth_token: cookies[:auth_token])
  	end
  end
  helper_method :logged_in_user

  #-------------------------------------------------------------------------
  #--  REQUIRE LOGGED IN USER  ---------------------------------------------
  #--  New Variables:
  #--    @logged_in_user: The currently logged in user
  #--  Note: This does not require any particular user, just one that is
  #--    logged in.
  def require_logged_in_user
    unless @logged_in_user = logged_in_user
      response = Hash.new
      response["bulletin"] = Hash.new
      response["bulletin"]["typd"] = "error"
      response["bulletin"]["title"] = "Login Required"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("You must be logged in to do that.")
      render json: response
    end
  end
  helper_method :require_logged_in_user



  #-------------------------------------------------------------------------
  #--  GET VALID GAME  -----------------------------------------------------
  #--  New Variables:
  #--    @game: The game returned from either the game_id or the id
  def get_valid_game
    #-- The game id might be held in the 'game_id' param
    #--   like with the URL games/:game_id/ships/:id
    if params[:game_id]
      game_id = params[:game_id]
    else
      game_id = params[:id]
    end

    unless @game = Game.find(game_id)
      response = Hash.new
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Game Not Found"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("That game could not be found.")
      render json: response
    end
  end
  helper_method :get_valid_game



  #-------------------------------------------------------------------------
  #--  REQUIRE VALID GAME PLAYER  ------------------------------------------
  #--  Assumption: There already exists @logged_in_user and @game variables
  def require_valid_game_player
    unless @game.users.include?(@logged_in_user)
      response = Hash.new
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "You do not have permission to play in that game"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("Only players can play in that game.")
      render json:response
    end
  end
  helper_method :get_valid_game_player


  #-------------------------------------------------------------------------
  #--  REQUIRE VALID GAME HOST  --------------------------------------------
  #--  Assumption: There already exists @logged_in_user and @game variables
  def require_valid_game_host
    unless @game.host == @logged_in_user
      response = Hash.new
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "You do not have permission to delete that game"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("Only the host of a game can delete it.")
      render json:response
    end
  end
  helper_method :require_valid_game_host


  #-------------------------------------------------------------------------
  #--  GET VALID SHIP  -----------------------------------------------------
  #--  New Variables:
  #--    @ship: The ship returned from either the ship_id or the id
  def get_valid_ship
    if params[:ship_id]
      ship_id = params[:ship_id]
    else
      ship_id = params[:id]
    end
    unless @ship = Ship.find(ship_id)
      response = Hash.new
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Ship Not Found"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("That ship could not be found.")
      render json: response
    end
  end
  helper_method :get_valid_ship


  #-------------------------------------------------------------------------
  #--  REQUIRE VALID SHIP PLAYER  ------------------------------------------
  #--  Assumption: There already exists @logged_in_user and @ship variables
  def require_valid_ship_player
    unless @ship.player.user == @logged_in_user
      response = Hash.new
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Ship Player Error"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("You don't have permission to manage that ship.")
      render json:response
    end
  end
  helper_method :get_valid_ship_player

end
