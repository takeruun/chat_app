# frozen_string_literal: true

class RoomsController < ApplicationController
  def index
    @rooms = Room.where(id: RoomUser.where(user_id: params[:current_user_id]).select('room_id AS id'))

    if @rooms.exists?
      render json: { rooms: @rooms }
    else
      render json: { text: 'チャットルームを作りましょう！', id: params[:current_user_id] }
    end
  end

  def create
    @room_name = params[:user_ids].length == 2 ? User.find_by(id: params[:user_ids][1]) : params[:room_name]
    @room = Room.create(room_name: @room_name)

    params[:user_ids].each do |user_id|
      RoomUser.create(user_id: user_id, room: @room)
    end
    @messages = @room.messages
    render json: { room_id: @room.id, room_name: @room.room_name, chatdata: @messages }
  end

  def show
    if @room = Room.find_by(id: params[:id])
      render json: { room_id: @room.id }
    else
      render json: { text: params[:id] }
    end
  end

  private

  def room_params
    params.require(:room).permit(:user_ids, :room_name)
  end
end
