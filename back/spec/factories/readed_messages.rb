FactoryBot.define do
  factory :readed_message do
    is_read { '' }
    user { '' }
    message { nil }
  end
end
