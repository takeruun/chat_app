# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :messages
end
