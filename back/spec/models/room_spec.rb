# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  let(:user) { create(:user) }
  let(:room) { create(:room) }

  it 'room を作成できる' do
    expect(room).to be_valid
  end

  context '多対多の関係' do
    before do
      @messages = create_list(:message, 3, room: room, user: user)
      @users = create_list(:user, 3)
      @users.each do |u|
        ru = create(:room_user, room: room, user: u)
      end
    end

    it '多数の message と関連づけられる' do
      expect(room.messages).to eq @messages
    end

    it '多数の user と関連づけれている' do
      get_users = []
      room.room_users.each do |ru|
        get_users.push(ru.user)
      end
      expect(get_users).to eq @users
    end
  end
end
