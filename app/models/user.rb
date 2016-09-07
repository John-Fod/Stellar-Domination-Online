class User < ApplicationRecord

  attr_accessor :password, :password_confirmation

  #-------------------------------
  #  VALIDATIONS  ----------------
  validates :username, 
    presence: { message: "A username is required." },
    uniqueness: { message: "That username is already taken." }
  validates :email,
    presence: { message: "Every game requires a registered host. Are you logged in?" },
    uniqueness: { message: "That email is already taken." }
  #  ON REGISTRATION  -----------
  validates :password,
    presence: { message: "A password is required." }, on: :create,
    confirmation: { message: "Password and password confirmation do not match." }, on: :create
  validates :password_confirmation,
    presence: { message: "Password confirmation is required." }, on: :create

  #-------------------------------
  #  ASSOCIATIONS  ---------------
  has_and_belongs_to_many :games
  has_many :players

  before_create { generate_token(:auth_token)}
  before_save :encrypt_password


  def hosting
    Game.where(["host = ?", self.id]).order("updated_at DESC")
  end

  def joinable_games
    Game.where.not(["host = ?", self.id]).where(["started = false"]).order("created_at ASC")
  end

  def get_random_game
    return self.joinable_games.first
  end

  def join_random_game
    #--Find the oldest joinable game
    joined_game = self.joinable_games.limit(1)
    if joined_game
      joined_game.add_user(self)
    else
      return false
    end
  end

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end

  #**********************************************************
  #AUTHENTICATE THE USER
  #**********************************************************
  #DESCRIPTION-----------------------------------------------
  #--Cycles through all users to see if the identification
  #matches a user and then checks that user against the
  #password provided.
  #INPUT-----------------------------------------------------
  #--identification[string]: Either the username or email
  #--password[string]: The password of the user
  #RETURN----------------------------------------------------
  #--Returns the user if successful, and nil if not
  #NOTE------------------------------------------------------
  #--Either the username or password can be entered as the
  #identification argument.
  def self.authenticate(identification, password)
    user = find_by_username(identification) unless user = find_by_email(identification)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      return user
    else
      nil
    end
  end


end
