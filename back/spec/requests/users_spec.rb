# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'UserAPI' do
    it 'post user' do
      post '/api/users', params: { username: 'user', email: 'test@example.com', password: 'password' }
      expect(response).to have_http_status(200)
    end

    it 'ユーザー作成できる' do
      post '/api/users', params: { username: 'user', email: 'test@example.com', password: 'password' }
      json = JSON.parse(response.body)
      expect(json['text']).to eq 'user作成しました'
    end
  end
end
