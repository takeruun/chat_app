# frozen_string_literal: true

class AppearanceBroadcastJob < ApplicationJob
  queue_as :default

  def perform(_user)
    users = User.all
    ActionCable
      .server
      .broadcast('appearance_channel',
                user: users)
  end

  private

  def render_json(user)
    ApplicationController.renderer.render(json: user)
  end
end
