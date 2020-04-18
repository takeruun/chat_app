class AppearanceBroadcastJob < ApplicationJob
  queue_as :default

  def perform(user)
    users = User.all
    ActionCable
      .server
      .broadcast("appearance_channel", 
      user: users
      )
  end

  private
  def render_json(user)
    ApplicationController.renderer.render(json: user)
  end
end