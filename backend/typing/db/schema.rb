# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_02_175319) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "keyboards", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.index ["users_id"], name: "index_keyboards_on_users_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.integer "wpm"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.bigint "keyboards_id"
    t.index ["keyboards_id"], name: "index_submissions_on_keyboards_id"
    t.index ["users_id"], name: "index_submissions_on_users_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "profile_picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "keyboards", "users", column: "users_id"
  add_foreign_key "submissions", "keyboards", column: "keyboards_id"
  add_foreign_key "submissions", "users", column: "users_id"
end
