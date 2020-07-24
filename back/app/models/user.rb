# frozen_string_literal: true

class User < ApplicationRecord
  validates :name, presence: true
  validates :password, presence: true, on: :create
  validates :email, { presence: true, uniqueness: {case_sensitive: true}}

  has_secure_token
  has_secure_password validations: true

  has_many :messages
  has_many :rooms, through: :room_users
  has_many :room_users

  after_update_commit :watchislogin_self

  def watchislogin_self
    AppearanceBroadcastJob.perform_later(self) if saved_change_to_is_login?
  end
end
