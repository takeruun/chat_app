class Work < ApplicationRecord
  belongs_to :user
  validates :status, presence: true

  enum status: { work: 0, task: 1 }
end
