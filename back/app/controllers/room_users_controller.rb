class RoomUsersController < ApplicationController
  def users
    @users = User.where(id: RoomUser.where(room_id: params[:room_id]).where.not(user_id: params[:user_id]).select('user_id AS id'))
    if @users.count == 1
      @users = []
    end
    render json: { users: @users }
  end
end
