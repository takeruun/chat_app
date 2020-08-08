# frozen_string_literal: true

class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    login_user = User.find_by(id: params[:user_id])
    login_user.is_login = true
    login_user.save
    stream_from 'appearance_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    login_user = User.find_by(id: params[:user_id])
    login_user.is_login = false
    login_user.save
  end
end
