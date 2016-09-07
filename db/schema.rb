# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160906072643) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.integer  "host"
    t.string   "name"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "num_players",      default: 2
    t.boolean  "started",          default: false
    t.boolean  "completed",        default: false
    t.integer  "cur_round",        default: 0
    t.integer  "ships_per_player", default: 3
  end

  create_table "games_users", id: false, force: :cascade do |t|
    t.integer "game_id", null: false
    t.integer "user_id", null: false
  end

  create_table "players", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "game_id"
    t.boolean  "ready",      default: false
    t.integer  "cur_round",  default: 0
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "ships", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "player_id"
    t.string   "frame"
    t.integer  "sheild_health"
    t.integer  "hull_health"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.string   "auth_token"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

end
