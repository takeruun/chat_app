# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create(data)
    Message.create(
      user: User.find(data.fetch('user_id')),
      room: Room.find(params[:room_id]),
      body: data.fetch('body')
    )
  end
end
