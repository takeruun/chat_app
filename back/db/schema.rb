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

ActiveRecord::Schema.define(version: 20_200_823_051_429) do
  create_table 'messages', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'body'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'user_id', null: false
    t.bigint 'room_id', null: false
    t.index ['room_id'], name: 'index_messages_on_room_id'
    t.index ['user_id'], name: 'index_messages_on_user_id'
  end

  create_table 'readed_messages', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.boolean 'is_read', default: false
    t.bigint 'user_id', null: false
    t.bigint 'message_id', null: false
    t.bigint 'room_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['message_id'], name: 'index_readed_messages_on_message_id'
    t.index ['room_id'], name: 'index_readed_messages_on_room_id'
    t.index ['user_id'], name: 'index_readed_messages_on_user_id'
  end

  create_table 'room_users', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'room_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['room_id'], name: 'index_room_users_on_room_id'
    t.index ['user_id'], name: 'index_room_users_on_user_id'
  end

  create_table 'rooms', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'unread_counts', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'room_id', null: false
    t.integer 'count', default: 0
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['room_id'], name: 'index_unread_counts_on_room_id'
    t.index ['user_id'], name: 'index_unread_counts_on_user_id'
  end

  create_table 'users', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name'
    t.string 'email'
    t.string 'icon'
    t.boolean 'is_login'
    t.string 'password_digest'
    t.string 'token'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'works', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.datetime 'start_time'
    t.datetime 'end_time'
    t.integer 'status', default: 0, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['user_id'], name: 'index_works_on_user_id'
  end

  add_foreign_key 'messages', 'rooms'
  add_foreign_key 'messages', 'users'
  add_foreign_key 'readed_messages', 'messages'
  add_foreign_key 'readed_messages', 'rooms'
  add_foreign_key 'readed_messages', 'users'
  add_foreign_key 'room_users', 'rooms'
  add_foreign_key 'room_users', 'users'
  add_foreign_key 'unread_counts', 'rooms'
  add_foreign_key 'unread_counts', 'users'
  add_foreign_key 'works', 'users'
end
