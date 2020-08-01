require 'rails_helper'

RSpec.describe 'Works', type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user, name: 'other_name') }

  describe 'WorksCreateAPI' do
    context 'user でログインしているとき' do
      it 'user の 勤務 時間計測を開始できる' do
        post '/api/v1/works/', params: { work: { status: 'work', user_id: user.id } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['work']['status']).to eq 'work'
        expect(json['work']['start_time'].empty?).to eq false
        expect(json['msg']).to include user.name
      end

      it 'user の タスク 時間計測開始できる' do
        post '/api/v1/works/', params: { work: { status: 'task', user_id: user.id } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['work']['status']).to eq 'task'
        expect(json['work']['start_time'].empty?).to eq false
        expect(json['msg']).to include user.name
      end
    end

    context 'other_user でログインしているとき' do
      it 'other_user の 勤務 時間計測を開始できる' do
        post '/api/v1/works/', params: { work: { status: 'work', user_id: other_user.id } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['work']['status']).to eq 'work'
        expect(json['work']['start_time'].empty?).to eq false
        expect(json['msg']).to include other_user.name
      end

      it 'other_user の タスク 時間計測開始できる' do
        post '/api/v1/works/', params: { work: { status: 'task', user_id: other_user.id } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['work']['status']).to eq 'task'
        expect(json['work']['start_time'].empty?).to eq false
        expect(json['msg']).to include other_user.name
      end
    end

    context 'ログインしていないとき' do
      it '勤務 時間計測開始できない' do
        post '/api/v1/works/', params: { work: { status: 'work' } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 500
      end

      it 'タスク 時間計測開始できない' do
        post '/api/v1/works/', params: { work: { status: 'task' } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 500
      end
    end
  end

  describe 'WorksUpdateAPI' do
    let(:work_w) { create(:work, status: 'work', user: user) }
    let(:work_t) { create(:work, status: 'task', user: user) }
    let(:work_o_w) { create(:work, status: 'work', user: other_user) }
    let(:work_o_t) { create(:work, status: 'task', user: other_user) }

    context 'user でログインしているとき' do
      it 'user の 勤務 時間計測を終了できる' do
        put "/api/v1/works/#{work_w.id}"
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['msg']).to include user.name
      end

      it 'user の タスク 時間計測を終了できる' do
        put "/api/v1/works/#{work_t.id}"
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['msg']).to include user.name
      end
    end

    context 'other_user でログインしているとき' do
      it 'other_user の 勤務 時間計測を終了できる' do
        put "/api/v1/works/#{work_o_w.id}"
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['msg']).to include other_user.name
      end

      it 'other_user の タスク 時間計測開始できる' do
        put "/api/v1/works/#{work_o_t.id}"
        json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(json['msg']).to include other_user.name
      end
    end

    context 'ログインしていないとき' do
      it '勤務 時間計測開始できない' do
        post '/api/v1/works/', params: { work: { status: 'work' } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 500
      end

      it 'タスク 時間計測開始できない' do
        post '/api/v1/works/', params: { work: { status: 'task' } }
        json = JSON.parse(response.body)
        expect(response.status).to eq 500
      end
    end
  end
end
