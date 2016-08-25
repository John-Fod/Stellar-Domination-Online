class GamesController < ApplicationController

  before_action :require_logged_in_user, only: [:create, :update, :destroy]

  def index

  end


  def create
    @game = Game.new(game_params)
    @game.host = logged_in_user
    response = Hash.new
    response["game"] = @game

    if @game.save
      #Return the user as a JSON object
      response["type"] = "notification"
      response["title"] = "Game Created"
      response["messages"] = ["New Game #{@game.name} has been created."]
      render json: response
    else
      response["type"] = "alert"
      response["title"] = "Validation Failure"
      response["messages"] = []
      @game.errors.full_messages.each do |new_message|
        response["messages"] << new_message
      end
      render json: response
    end
  end

  def destroy

  end


  private

    def game_params
      params.require(:game).permit(
        :name
      )
    end

end
