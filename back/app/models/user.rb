# frozen_string_literal: true

class User < ApplicationRecord
  validates :name, presence: true
  validates :password, presence: true
  validates :email, { presence: true, uniqueness: {case_sensitive: true}}

  has_secure_token
  has_secure_password

  has_many :messages

  after_update_commit :watchislogin_self

  def watchislogin_self
    AppearanceBroadcastJob.perform_later(self) if saved_change_to_is_login?
  end
end
