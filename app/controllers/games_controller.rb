class GamesController < ApplicationController

  before_action :require_logged_in_user, only: [:index, :state, :declare_ready, :join_random_game, :create, :update, :destroy]
  before_action :get_valid_game, only: [:state, :show, :declare_ready, :destroy]
  before_action :require_valid_game_player, only: [:state, :declare_ready]
  before_action :require_valid_game_host, only: [:destroy]

  def index
    response = Hash.new
    response["user"] = @logged_in_user
    response["joined"] = []
    @logged_in_user.games.each do |game|
      response["joined"].push(game.overview)
    end
    if(response["joined"])
      render json:response
    else
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "No Games Found"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("We couldn't find any games.")
      render json:response
    end
  end

  def joinable
    response = Hash.new
    response["user"] = @logged_in_user
    response["joinable"] = @logged_in_user.joinable_games
    if(response["joinable"])
      render json:response
    else
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "No Games Found"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("We couldn't find any games.")
    end
  end

  def state
    if @game.completed
      response = @game.state(true, @logged_in_user)
    elsif @game.cur_round == 0 #-- Do not show opponent's ships
      response = @game.state(false, @logged_in_user)
    else #-- Show the oppenent's ships
      response = @game.state(false, @logged_in_user)
    end
    render json:response
  end


  def create
    @game = Game.new(game_params)
    @game.host = logged_in_user
    response = Hash.new
    response["bulletin"] = Hash.new
    response["bulletin"]["messages"] = []
    response["game"] = @game.overview

    if @game.save
      @game.add_player logged_in_user
      response["bulletin"]["type"] = "notification"
      response["bulletin"]["title"] = "Game Created"
      response["bulletin"]["messages"].push("New Game #{@game.name} has been created.")
      response["hosting"] = logged_in_user.hosting
      response["joined"] = logged_in_user.games
      render json: response
    else
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Game Creation Failed"
      @game.errors.full_messages.each do |new_message|
        response["bulletin"]["messages"].push(new_message)
      end
      response["hosting"] = logged_in_user.hosting
      render json: response
    end
  end

  def destroy
    response = Hash.new
    response["game"] = @game.state
    response["bulletin"] = Hash.new

    if @game.destroy
      response["bulletin"]["type"] = "notification"
      response["bulletin"]["title"] = "Game #{@game.name} Deleted"
      response["bulletin"]["messages"] = ["#{@game.name} is no longer available."]
      response["hosting"] = logged_in_user.hosting
      response["joined"] = logged_in_user.games
      render json:response
    else
      response["type"] = "alert"
      response["title"] = "Game #{@game.name} Deletion Failed"
      response["messages"] = []
      response["joined"] = logged_in_user.games
      render json:response
    end
  end

  def join_random_game
    game = logged_in_user.get_random_game
    response = Hash.new
    response["bulletin"] = Hash.new
    response["bulletin"]["messages"] = []
    if game
      game.add_player logged_in_user
      response["game"] = game.overview
      response["bulletin"]["type"] = "notification"
      response["bulletin"]["title"] = "Game Joined"
      response["bulletin"]["messages"].push("You are now plaing in the game #{game.name}")
      response["joined"] = logged_in_user.games
    else
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "No Games to Join"
      response["bulletin"]["messages"].push("There are not any available games.")
      response["joined"] = logged_in_user.games
    end
    render json:response
  end


  #*************************************************************************************
  #DECLAIR READY 
  #*************************************************************************************
  #  A user declairs they are ready to advance to the next round of the game.
  #ASSUMPTIONS  ------------------------------------------------------------------------
  #  @logged_in_user is available - From require_logged_in_user
  #  @game is available - From get_valid_game
  #OUTPUT  -----------------------------------------------------------------------------
  #  response: The state of the game. It will depend on how far along the game is.
  def declare_ready

    if player = Player.where(["game_id = ?", @game.id]).where(["user_id = ?", @logged_in_user.id]).first
      player.declare_ready
    else
      #-----------------
      #-----------------
      #-----------------
    end

    @game.advance_round if @game.all_players_ready?

    #--  GET THE RESPONSE
    #--    The response depends on the state of the game
    if @game.completed
      response = @game.state(true, @logged_in_user)
    elsif @game.cur_round == 0 #-- Do not show opponent's ships before the game starts
      response = @game.state(false, @logged_in_user)
    else #-- Show the oppenent's ships
      response = @game.state(false, @logged_in_user)
    end
    render json:response
  end



  def frames
    response = Hash.new
    response["frames"] = Ship.frames
  end


  private

    def game_params
      params.require(:game).permit(
        :name
      )
    end

end
