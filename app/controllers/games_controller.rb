class GamesController < ApplicationController

  before_action :require_logged_in_user, only: [:index, :state, :join_random_game, :create, :update, :destroy]
  before_action :get_valid_game, only: [:state, :show, :destroy]
  before_action :require_valid_game_player, only: [:state]
  before_action :require_VALID_game_host, only: [:destroy]

  def index
    response = Hash.new
    response["user"] = @logged_in_user
    response["joined"] = @logged_in_user.games
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
      response = @game.state(true, @logged_in_user)
    end
    render json:response
  end


#-------------------------------------------------------
#-- MARK FOR DELETION ----------------------------------
  def show
    @game = Game.find(params[:id])
    response = Hash.new
    response["user"] = logged_in_user
    response["game"] = @game
    if(@game)
      response["players"] = []
      @game.players.each do |player|
        curPlayer = Hash.new
        curPlayer["ready"] = player.ready
        curPlayer["id"] = player.id
        curPlayer["user"] = player.user
        response["players"].push(curPlayer)
      end
      response["ships"] = []
      @game.ships.each do |ship|
        curShip = Hash.new
        curShip[""]
      end
    else
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "No Games Found"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("We couldn't find any games.")
    end
    render json:response
  end


  def create
    @game = Game.new(game_params)
    @game.host = logged_in_user
    response = Hash.new
    response["bulletin"] = Hash.new
    response["bulletin"]["messages"] = []
    response["game"] = @game

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
    @game = Game.find(params[:id])
    response = Hash.new
    response["game"] = @game
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
      response["game"] = game
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

  def declare_ready
    response = Hash.new
    game = Game.find(params[:id])
    player = Player.where(["game_id = ?", params[:id]]).where(["user_id = ?", logged_in_user.id]).first
    player.ready = true
    player.save
    if game.all_players_ready?
      #--  IF ALL PLAYERS ARE READY, INCREMENT THE ROUND
      game.cur_round = game.cur_round + 1
      game.save
      #--  EVERY PLAYER'S READY STATUS IS NOW FALSE
      game.players.each do |player|
        player.ready = false
        player.save
      end
    end
    #--  GET THE RESPONSE
    response["players"] = []
    game.players.each do |player|
      curPlayer = Hash.new
      curPlayer["ready"] = player.ready
      curPlayer["user"] = player.user
      response["players"].push(curPlayer)
    end
    response["game"] = game
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

    def require_game_host
      if @game = Game.find(params[:id])
        unless @game.host == logged_in_user
          response = Hash.new
          response["bulletin"] = Hash.new
          response["bulletin"]["type"] = "error"
          response["bulletin"]["title"] = "You do not have permission to delete that game"
          response["bulletin"]["messages"] = []
          response["bulletin"]["messages"].push("Only the host of a game can delete it.")
          response["joined"] = logged_in_user.games
          render json:response
        end
      end
    end

    def require_game_player
      if @game = Game.find(params[:id])
        unless @game.users.include?(logged_in_user)
          response = Hash.new
          response["bulletin"] = Hash.new
          response["bulletin"]["type"] = "error"
          response["bulletin"]["title"] = "You do not have permission to play in that game"
          response["bulletin"]["messages"] = []
          response["bulletin"]["messages"].push("Only players can play in that game.")
          render json:response
        end
      end
    end

end
