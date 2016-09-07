class UsersController < ApplicationController



  def index
     @users = User.all
  end



  def login
    response = Hash.new
    @user = User.authenticate(params[:credentials][:identification], params[:credentials][:password])
    response['bulletin'] = Hash.new
    response["bulletin"]["messages"] = []
    if @user
      #---------------
      #--Login Success
      response['user'] = @user
      response['games'] = @user.hosting
      response["bulletin"]["type"] = "notification"
      response["bulletin"]["title"] = "Welcome #{@user.username}."
      response["bulletin"]["messages"].push("You have been logged in successfully.")
      #--Log the user in
      if params[:remember_me]
        cookies.permanent[:auth_token] = user.auth_token
      else
        cookies[:auth_token] = @user.auth_token
      end
    else
      #---------------
      #--Login Failure
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Login Failed"
      response["bulletin"]["messages"].push("Identification and password do not match.")
    end
    render json: response

  end



  def logout
    response = Hash.new
    response["bulletin"] = Hash.new
    response["bulletin"]["messages"] = []
    if logged_in_user
      @user = logged_in_user
      cookies.delete(:auth_token)
      response["bulletin"]["type"] = "notification"
      response["bulletin"]["title"] = "Logout Successfull"
      response["bulletin"]["messages"].push("You have been logged out.")
      response["user"] = @user
    else
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Logout Failed"
      response["bulletin"]["messages"].push("You must be logged in to do that.")
    end
    render json: response
  end



  def create
    @user = User.new(create_params)
    response = Hash.new
    response["bulletin"] = Hash.new
    response["bulletin"]["messages"] = []

    if @user.save
      #--------------------
      #--Creation Succeeded
      if params[:remember_me]
        cookies.permanent[:auth_token] = @user.auth_token
      else
        cookies[:auth_token] = @user.auth_token
      end
      #--Make the response
      response["bulletin"]["type"] = "notification"
      response["bulletin"]["title"] = "New Account Created"
      response["bulletin"]["messages"].push("Welcome to Stellar Domination #{@user.username}")
      response["bulletin"]["messages"].push("You have been logged in.")
      response["user"] = @user
      render json: response
    else
      #-----------------
      #--Creation Failed
      response["bulletin"]["type"] = "error"
      response["bulletin"]["title"] = "Account Creation Failed"
      @user.errors.full_messages.each do |new_message|
        response["bulletin"]["messages"].push(new_message)
      end
      render json: response
    end
  end



  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head :no_content
  end



  private

    def create_params
      params.require(:user).permit(
        :username,
        :email,
        :password,
        :password_confirmation
      )
    end

    def login_params
      params.require(:credentials).permit(
        :identification,
        :password
      )
    end

end
