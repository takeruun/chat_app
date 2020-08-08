# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RoomUser, type: :model do
  let(:user) { create(:user) }
  let(:room) { create(:room) }
  let(:room_user) { create(:room_user, user: user, room: room) }

  it 'room と user を関連づけれる' do
    expect(room_user).to be_valid
  end

  it 'room がないと関連づけれない' do
    room_user.room = nil
    room_user.valid?
    expect(room_user.errors.full_messages[0]).to eq 'Room must exist'
  end

  it 'user がないと関連づけれない' do
    room_user.user = nil
    room_user.valid?
    expect(room_user.errors.full_messages[0]).to eq 'User must exist'
  end
end
