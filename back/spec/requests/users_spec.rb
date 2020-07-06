# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'UserAPI' do
    before do
      create_list(:user, 2)
    end

    it 'ユーザー作成できる' do
      post '/api/signup', params: { username: 'user', email: 'test@example.com', password: 'password' }
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json['text']).to eq 'user作成しました'
    end

    it '全ユーザー所得できる' do
      get '/api/users/'
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.length).to eq(2)
    end
  end
end
