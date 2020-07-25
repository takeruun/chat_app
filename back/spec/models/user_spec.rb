# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }
  let(:other_user) { build(:user) }

  it 'ユーザー登録できる' do
    expect(user).to be_valid
  end

  it 'token発行されている' do
    user.save
    expect(user.token.empty?).to eq false
  end

  it 'nameがないと登録できない' do
    user.name = nil
    user.valid?
    expect(user.errors.full_messages[0]).to eq "Name can't be blank"
  end

  it 'passwordがないと登録できない' do
    user.password = nil
    user.valid?
    expect(user.errors.full_messages[0]).to eq "Password can't be blank"
  end

  it 'passwordが6文字以下では登録できない' do
    user.password = '123'
    user.password_confirmation = '123'
    user.valid?
    expect(user.errors.full_messages[0]).to eq "Password is too short (minimum is 6 characters)"
  end

  it 'password confirmationがないと登録できない' do
    user.password_confirmation = nil
    user.valid?
    expect(user.errors.full_messages[0]).to eq "Password confirmation can't be blank"
  end

  it 'passwordとconfirmが一致しないと登録できない' do
    user.password_confirmation = 'example' 
    user.valid?
    expect(user.errors.full_messages[0]).to eq "Password confirmation doesn't match Password"
  end

  it '同じemailでは登録できない' do
    user.save
    other_user.email = user.email
    other_user.valid?
    expect(other_user).to_not be_valid
  end

  context '多対多の関係' do
    let(:room){create(:room)}
    before do
      @messages = create_list(:message, 3, user: user, room: room)
      @rooms = create_list(:room, 3)
      @rooms.each do |r|
        ru = create(:room_user, user: user, room: r)
      end
    end

    it '多数の message と関連づけられる' do
      expect(user.messages).to eq @messages
    end

    it'多数の room と関連づけられる' do
      get_rooms = []
      user.room_users.each do |ru|
        get_rooms.push(ru.room)
      end
      expect(get_rooms).to eq @rooms
    end
  end
end
