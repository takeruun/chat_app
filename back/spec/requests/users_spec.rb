# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'UserCreateAPI' do
    it 'ユーザー作成できる' do
      post '/api/v1/signup', params: { username: 'user', email: 'test@example.com', password: 'password', password_confirmation: 'password' }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['text']).to eq 'user作成しました'
    end

    it 'password と password_confirmation 不一致で作成できない' do
      post '/api/v1/signup', params: { username: 'user', email: 'test@example.com', password: 'password', password_confirmation: 'pass' }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['err_msg'][0]).to eq `Password confirmation doesn't match Password`
    end
  end

  describe 'UserShowAPI' do
    before do
      @users = create_list(:user, 2)
    end

    it 'ユーザ1取得できる' do
      get "/api/v1/users/#{@users[0].id}"
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['user']['name']).to eq 'test_name1'
      expect(json['user']['email']).to eq 'test1@example.com'
    end

    it 'ユーザ2取得できる' do
      get "/api/v1/users/#{@users[1].id}"
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['user']['name']).to eq 'test_name4'
      expect(json['user']['email']).to eq 'test4@example.com'
    end

    it '全ユーザー所得できる' do
      get '/api/v1/users'
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json.length).to eq 2
    end
  end

  describe 'UserUpdateAPI' do
    let(:user) { create(:user) }

    it 'ユーザの name 変更できる' do
      put "/api/v1/users/#{user.id}", params: { user: { name: 'update' } }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['user']['name']).to eq 'update'
    end

    it 'ユーザの email 変更できる' do
      put "/api/v1/users/#{user.id}", params: { user: { email: 'update@example.com' } }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['user']['email']).to eq 'update@example.com'
    end

    it 'ユーザの password 変更できる' do
      put "/api/v1/users/#{user.id}", params: { user: { password: 'testtest', password_confirmation: 'testtest' } }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['text']).to eq 'updateしました'
    end

    it 'ユーザの password confirmation不一致で変更できない' do
      put "/api/v1/users/#{user.id}", params: { user: { password: 'testtest', password_confirmation: 'test' } }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['err_msg'][0]).to eq `Password confirmation doesn't match Password`
    end
  end

  describe 'UserSessionAPI' do
    let(:user) { create(:user) }

    it 'ログインできる' do
      get '/api/v1/login', params: { user: { email: user.email, password: user.password } }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['text']).to eq 'ログインしました'
      expect(json['token'].empty?).to eq false
    end

    it 'email が間違ってログインできない' do
      get '/api/v1/login', params: { user: { email: 'test', password: user.password } }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['text']).to eq 'メールアドレス or パスワードが間違っています'
    end

    it 'password が間違ってログインできない' do
      get '/api/v1/login', params: { user: { email: user.email, password: 'test' } }
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['text']).to eq 'メールアドレス or パスワードが間違っています'
    end
  end

  describe 'UserDeleteAPI' do
    let(:user) { create(:user) }

    it 'ユーザ削除できる' do
      delete "/api/v1/users/#{user.id}"
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json['text']).to eq 'user削除しました'
    end
  end
end
