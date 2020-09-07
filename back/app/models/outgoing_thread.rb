class OutgoingThread < ApplicationRecord
  belongs_to :user
  belongs_to :mention_thread
end
