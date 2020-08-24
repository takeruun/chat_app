# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create(data)
    message = Message.create(
      user: User.find(data.fetch('user_id')),
      room: Room.find(params[:room_id]),
      body: data.fetch('body')
    )

    ReadedMessage.create(
      user_id: data.fetch('user_id'),
      message: message,
      room_id: params[:room_id],
      is_read: true
    )
  end
end
