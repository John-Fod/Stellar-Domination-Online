class ShipsController < ApplicationController

  def frames
  	response = Hash.new
  	response["frames"] = Ship.frames
  	render  json: response
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
