# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    user { nil }
    room { nil }
    sequence(:body) { |n| "example_#{n}" }
  end
end
