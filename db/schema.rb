# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_24_095052) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "instructions", force: :cascade do |t|
    t.string "title"
    t.string "instruction_type", default: "fast"
    t.text "description"
    t.string "image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "steps", force: :cascade do |t|
    t.integer "parent"
    t.string "title", default: ""
    t.text "description", default: ""
    t.string "image"
    t.integer "children", default: [], array: true
    t.bigint "instruction_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["instruction_id"], name: "index_steps_on_instruction_id"
  end

end
