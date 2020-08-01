require 'rails_helper'

RSpec.describe Work, type: :model do
  let(:user) { create(:user)  }
  let(:work_w) { build(:work, status: 'work', user: user) }
  let(:work_t) { build(:work, status: 'task', user: user) }

  context 'status が work のとき' do
    it '仕事の時間モデルをつくれる' do
      expect(work_w).to be_valid
    end

    it 'status がないとモデルをつくれない' do
      work_w.status = nil
      work_w.valid?
      expect(work_w.errors.full_messages[0]).to eq "Status can't be blank"
    end

    it '開始時間は記録されている' do
      expect(work_w.start_time.class).to eq ActiveSupport::TimeWithZone
    end

    it '終了時間は記録されている' do
      work_w.end_time = Time.zone.now.strftime('%Y-%m-%d %H:%M:%S')
      expect(work_w.end_time.class).to eq ActiveSupport::TimeWithZone
    end
  end

  context 'status が task のとき' do
    it '仕事の時間モデルをつくれる' do
      expect(work_t).to be_valid
    end

    it 'status がないとモデルをつくれない' do
      work_t.status = nil
      work_t.valid?
      expect(work_t.errors.full_messages[0]).to eq "Status can't be blank"
    end

    it '開始時間は記録されている' do
      expect(work_t.start_time.class).to eq ActiveSupport::TimeWithZone
    end

    it '終了時間は記録されている' do
      work_t.end_time = Time.zone.now.strftime('%Y-%m-%d %H:%M:%S')
      expect(work_t.end_time.class).to eq ActiveSupport::TimeWithZone
    end
  end
end
