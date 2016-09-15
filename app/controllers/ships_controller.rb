class ShipsController < ApplicationController

  before_action :require_logged_in_user, only: [:update]
  before_action :get_valid_game, only: [:update]
  before_action :require_valid_game_player, only: [:update]
  before_action :get_valid_ship, only: [:update]
  before_action :require_valid_ship_player, only: [:update]


  def frames
  	response = Hash.new
  	response["frames"] = Ship.frames
  	render  json: response
  end

  def update
    @ship.frame = params[:frame]
    @ship.save
    @game.reload
    response = @game.state(true, logged_in_user)

    render json: response
  end


  private

    def create_params
      params.require(:ship).permit(
        :frame,
        :player_id,
        :game_id
      )
    end

end
