class InterfaceController < ApplicationController
  protect_from_forgery with: :exception

  def index
  	@loggedin_in_user = logged_in_user
    @users = User.all
    @user_games = logged_in_user.hosting if logged_in_user
    @joinable_games = logged_in_user.joinable_games if logged_in_user
  end

end
