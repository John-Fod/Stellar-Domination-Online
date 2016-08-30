class User < ApplicationRecord

  attr_accessor :password, :password_confirmation

  before_create { generate_token(:auth_token)}
  before_save :encrypt_password

  #has_many :hosted_games, class_name: "Game", primary_key: "id", foreign_key: "host"
  #has_many :hosted_games, :class_name => "Game", :primary_key => "id", :foreign_key => "host"
  #has_many :hosted_games, class_name: "Game", primary_key: "id", foreign_key: "host"


  def hosting
    Game.where(["host = ?", self.id])
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
    puts "-----------------Searching for #{identification}"
    user = find_by_username(identification) unless user = find_by_email(identification)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      puts "----------------Returned user #{user.username}"
      return user
    else
      nil
    end
  end


end
