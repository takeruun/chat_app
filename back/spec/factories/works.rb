FactoryBot.define do
  factory :work do
    user { nil }
    start_time { Time.zone.now.strftime('%Y-%m-%d %H:%M:%S') }
    end_time { nil }
    status { nil }
  end
end
