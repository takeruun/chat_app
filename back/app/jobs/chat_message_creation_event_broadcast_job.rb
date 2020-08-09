# frozen_string_literal: true

class ChatMessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(chat_message)
    ActionCable
      .server
      .broadcast("chat_channel_#{chat_message.room_id}",
                 id: chat_message.id,
                 user_id: chat_message.user_id,
                 room_id: chat_message.room_id,
                 created_at: chat_message.created_at,
                 body: chat_message.body)
  end
end
