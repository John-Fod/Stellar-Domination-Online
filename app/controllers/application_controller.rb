class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def logged_in_user
  	if cookies[:auth_token]
      return @logged_in_user ||= User.select("username, email, id").find_by(auth_token: cookies[:auth_token])
  	end
  end
  helper_method :logged_in_user


  def require_logged_in_user
    unless logged_in_user
      return :message => "You must be logged in to do that."
      #render json: "{'error': 'You must be logged to do that.'}"
    end
  end
  helper_method :require_logged_in_user

end
