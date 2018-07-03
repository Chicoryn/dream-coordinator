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

ActiveRecord::Schema.define(version: 2018_07_02_225704) do

  create_table "features", force: :cascade do |t|
    t.integer "network_id"
    t.binary "data", limit: 4294967295
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_features_on_created_at"
    t.index ["network_id"], name: "index_features_on_network_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "network_id"
    t.string "category"
    t.binary "data", limit: 4294967295
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_games_on_created_at"
    t.index ["network_id"], name: "index_games_on_network_id"
  end

  create_table "networks", force: :cascade do |t|
    t.string "name"
    t.float "elo"
    t.binary "data", limit: 4294967295
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "number_of_features", default: 0, null: false
    t.integer "number_of_games", default: 0, null: false
    t.integer "number_of_preceding", default: 0, null: false
  end

end
