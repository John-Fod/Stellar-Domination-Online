class UsersController < ApplicationController


  def index
     @users = User.all
  end


  def login
    @user = User.authenticate(params[:credentials][:identification], params[:credentials][:password])
    if @user
      #--Log the user in
      if params[:remember_me]
        cookies.permanent[:auth_token] = user.auth_token
      else
        cookies[:auth_token] = @user.auth_token
      end
      #--Send the user information back
      render json: @user
    else
      render json: {'errors' => 'Identification and password do not match.'}
    end

  end

  def logout
    @user = logged_in_user if logged_in_user
    cookies.delete(:auth_token)
    render json: @user if @user
  end


  def create
    @user = User.new(user_params)

    if @user.save
      #Log the user in
      if params[:remember_me]
        cookies.permanent[:auth_token] = @user.auth_token
      else
        cookies[:auth_token] = @user.auth_token
      end
      #Return the user as a JSON object
      render json: @user
    else
      render json: @user.errors, status: unprocessable_entity
    end
  end


  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head :no_content
  end


  private

    def user_params
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
