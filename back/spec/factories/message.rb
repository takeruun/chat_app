# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    user { nil }
    room { nil }
    name { 'example' }
  end
end
