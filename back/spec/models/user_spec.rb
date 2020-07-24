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
    expect(user.erros.full_messages[0]).to eq "Password confirmation can't be blank"
  end

  it 'passwordとconfirmが一致しないと登録できない' do
    user.password_confirmation = 'example' 
    user.valid?
    expect(user.errors.full_messages[0]).to eq "Password confirmation doesn't match Password"
  end

  it '同じemailでは登録できない' do
    other_user.email = user.email
    other_user.valid?
    expect(other_user).to_not be_valid
  end
end
