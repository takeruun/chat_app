class AppearanceBroadcastJob < ApplicationJob
  queue_as :default

  def perform(user)
    ActionCable
      .server
      .broadcast("appearance_channel", 
      user: user
      )
  end

  private
  def render_json(user)
    ApplicationController.renderer.render(json: user)
  end
end