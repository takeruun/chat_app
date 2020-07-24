require 'rails_helper'

RSpec.describe 'Rooms', type: :request do
  describe 'RoomCreateAPI' do
    context 'user:0 でログインしているとき' do
      before do
        @users = create_list(:user, 3)
        get '/api/v1/login', params: { user: { email: @users[0].email, password: @users[0].password } }
        json = JSON.parse(response.body)
        @current_user = json['user']
      end

      it 'user:0 対 user:1　の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[1].id] }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq @users[1].name
      end

      it 'user:0 対 user:2　の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[2].id] }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq @users[2].name
      end

      it 'グループ の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[1].id, @users[2].id], room_name: 'example' }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq 'example'
      end
    end

    context 'user:1 でログインしているとき' do
      before do
        @users = create_list(:user, 3)
        get '/api/v1/login', params: { user: { email: @users[1].email, password: @users[1].password } }
        json = JSON.parse(response.body)
        @current_user = json['user']
      end

      it 'user:1 対 user:0　の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[0].id] }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq @users[0].name
      end

      it 'user:1 対 user:2　の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[2].id] }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq @users[2].name
      end

      it 'グループ の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[0].id, @users[2].id], room_name: 'example' }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq 'example'
      end
    end

    context 'user:0 でログインしているとき' do
      before do
        @users = create_list(:user, 3)
        get '/api/v1/login', params: { user: { email: @users[2].email, password: @users[2].password } }
        json = JSON.parse(response.body)
        @current_user = json['user']
      end

      it 'user:2 対 user:1　の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[1].id] }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq @users[1].name
      end

      it 'user:2 対 user:0　の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[0].id] }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq @users[0].name
      end

      it 'グループ の roomを作成できる' do
        post '/api/v1/rooms', params: { user_ids: [@current_user['id'], @users[1].id, @users[0].id], room_name: 'example' }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['room_name']).to eq 'example'
      end
    end
  end
end
