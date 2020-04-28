# frozen_string_literal: true

module JwtAuthenticator
  require 'jwt'

  SECRET_KEY_BASE = Rails.application.secrets.secret_key_base

  # 暗号化処理
  def encode(user_id)
    expires_in = 1.month.from_now.to_i # 再ログインを必要とするまでの期間を１ヶ月とした場合
    preload = { user_id: user_id, exp: expires_in }
    JWT.encode(preload, SECRET_KEY_BASE, 'HS256')
  end

  # 復号化処理
  def decode(encoded_token)
    decoded_dwt = JWT.decode(encoded_token, SECRET_KEY_BASE, true, { algorithm: 'HS256' })
    decoded_dwt.first
  end
end
