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
    puts room_params
    @name = room_params[:user_ids].length == 2 ? User.find_by(id: room_params[:user_ids][1]).name : room_params[:name]
    @room = Room.create(name: @name)

    room_params[:user_ids].each do |user_id|
      RoomUser.create(user_id: user_id, room: @room)
    end
    @messages = @room.messages
    render json: { room: @room, chatdata: @messages }
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
    params.require(:room).permit(:name, user_ids: [])
  end
end
