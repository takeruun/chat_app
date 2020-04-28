# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  after_create_commit do
    ChatMessageCreationEventBroadcastJob.perform_later(self)
  end
end
