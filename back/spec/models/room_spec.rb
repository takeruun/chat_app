# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  let(:user){ create(:user) }
  let(:room){ cerate(:room, user: user) }

  it 'room を作成できる' do
    expect(room).to be_valid
  end

  it 'name がないと作成できない' do
    room.name = nil
    expect(room.errors.full_messages[0]).to "Name can't be blank"
  end
end
