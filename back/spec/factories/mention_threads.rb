FactoryBot.define do
  factory :mention_thread do
    user { nil }
    room { nil }
    content { 'MyString' }
    is_read { false }
  end
end
