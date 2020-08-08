# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:user) { create(:user) }
  let(:room) { create(:room) }
  let(:message) { create(:message, user: user, room: room) }

  it 'message を作成できる' do
    expect(message).to be_valid
  end

  it 'room がないと作成できない' do
    message.room = nil
    message.valid?
    expect(message.errors.full_messages[0]).to eq 'Room must exist'
  end

  it 'user がないと作成できない' do
    message.user = nil
    message.valid?
    expect(message.errors.full_messages[0]).to eq 'User must exist'
  end
end
