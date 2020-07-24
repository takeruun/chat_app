# frozen_string_literal: true

class Room < ApplicationRecord
  validates :name, presence: true
  
  has_many :messages
  has_many :users, through: :room_users
  has_many :room_users
  accepts_nested_attributes_for :room_users
end
