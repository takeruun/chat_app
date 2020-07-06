# frozen_string_literal: true

class RoomsController < ApplicationController
  def index
    user_have_rooms = RoomUser.where(user_id: params[:current_user_id])
    room_ids = []
    user_have_rooms.each do |user_room|
      room_ids.push(user_room.room_id)
    end

    if @rooms = Room.where(id: room_ids)
      render json: { rooms: @rooms }
    else
      render json: { text: 'チャットルームを作りましょう！' }
    end
    # if @room
    #  @messages = @room.messages
    #  render json: { chatdata: @messages, room_id: @room.id }
    # else
    #  room = Room.create(room_name: params[:roomName])
    #  render json: { text: "room作成しました #{room.room_name}", room_id: room.id, chatdata: [] }
    # end
  end

  def create
    @room = Room.create
    params[:user_ids].each do |user_id|
      RoomUser.create(user_id: user_id, room: @room)
    end
    render json: { room_id: @room.id }
  end
end
