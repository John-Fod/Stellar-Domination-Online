class GamesController < ApplicationController

  before_action :require_logged_in_user, only: [:index, :create, :update, :destroy]

  def index
    response = Hash.new
    response["user"] = logged_in_user
    response["games"] = logged_in_user.hosting
    if(response["games"])
      render json:response
    else
      response["bulletin"] = Hash.new
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Error Retrieving Games"
      response["bulletin"]["messages"] = []
      response["bulletin"]["messages"].push("There was a proplem retrieving data from the server.")
    end
  end


  def create
    @game = Game.new(game_params)
    @game.host = logged_in_user
    response = Hash.new
    response["bulletin"] = Hash.new
    response["bulletin"]["messages"] = []
    response["game"] = @game

    if @game.save
      response["bulletin"]["type"] = "notification"
      response["bulletin"]["title"] = "Game Created"
      response["bulletin"]["messages"].push("New Game #{@game.name} has been created.")
      response["games"] = logged_in_user.hosting
      render json: response
    else
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Game Creation Failed"
      @game.errors.full_messages.each do |new_message|
        response["bulletin"]["messages"].push(new_message)
      end
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
      response["games"] = logged_in_user.hosting
      render json:response
    else
      response["type"] = "alert"
      response["title"] = "Game #{@game.name} Deletion Failed"
      response["messages"] = []
      render json:response
    end
  end


  private

    def game_params
      params.require(:game).permit(
        :name
      )
    end

end
