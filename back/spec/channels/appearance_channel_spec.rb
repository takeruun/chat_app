# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AppearanceChannel, type: :channel do
  let(:user) { create(:user) }

  it '購読できる' do
    subscribe(user_id: user.id)
    expect(subscription).to be_confirmed
    expect(subscription.streams).to include 'appearance_channel'
  end
end
