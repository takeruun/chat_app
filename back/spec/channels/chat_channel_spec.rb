# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChatChannel, type: :channel do
  let(:room){ create(:room) }
  it '購読できる' do
    subscribe(room_id: room.id)
    expect(subscription).to be_confirmed
    expect(subscription.streams).to include "chat_channel_#{room.id}"
  end
end
