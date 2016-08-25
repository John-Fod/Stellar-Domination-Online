class Game < ApplicationRecord

  #-------------------------------
  #  VALIDATIONS  ----------------
  validates :name, presence: { message: "Please give your new game a name."}
  validates :host, presence: { message: "Every game requires a registered host. Are you logged in?"}

  #-------------------------------
  #  ASSOCIATIONS  ---------------
  #belongs_to :host, :class_name => "User", :primary_key => "id", :foreign_key => "host"
  belongs_to :host, class_name: "User", foreign_key: "host"


end