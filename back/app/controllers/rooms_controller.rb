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
    if params[:use_ids].length == 2
      partner_user = User.find_by(id: params[:user_ids][1])
      @room = Room.create(room_name: partner_user.name)
    else
      @room = Room.create()
    end
    params[:user_ids].each do |user_id|
      RoomUser.create(user_id: user_id, room: @room)
    end
    @messages = @room.messages
    render json: { room_id: @room.id, chatdata: @messages }
  end

  def show
    if @room = Room.find_by(id: params[:id])
      render json: { room_id: @room.id }
    else
      render json: { text: params[:id] }
    end
  end
end
