# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }

  it 'ユーザー登録できる' do
    expect(user).to be_valid
  end

  it 'token発行されている' do
    expect(user.token.empty?).to eq false
  end

  it '同じemailでは登録できない' do
    other_user.email = user.email
    other_user.valid?
    expect(other_user).to_not be_valid
  end
end
