# frozen_string_literal: true

class RoomsController < ApplicationController
  def index
    @rooms = Room.where(id: RoomUser.where(user_id: params[:current_user_id]).select('room_id AS id'))
    @room_names = []
    @rooms.each do |room|
      if RoomUser.where(room_id: room.id).count == 2
        @room_names.push(User.find_by(id: RoomUser.where(room_id: room.id).where.not(user_id: params[:current_user_id]).select('user_id AS id')).name)
      else
        @room_names.push(room.name)
      end
    end
    if @rooms.exists?
      render json: { rooms: @rooms, room_names: @room_names }
    else
      render json: { msg: 'チャットルームを作りましょう！' }
    end
  end

  def create
    if room_params[:user_ids].length == 2
      RoomUser.where(user_id: room_params[:user_ids][0]).group(:room_id).select('room_id AS id').each do |room_user|
        if RoomUser.where('room_id = ? AND user_id = ?', room_user, room_params[:user_ids][1]).exists? && RoomUser.where(room_id: room_user).count == 2
          render json: { msg: 'すでに room あります！' }
          return
        end
      end
    end
    
    @room = Room.create(name: room_params[:name])

    room_params[:user_ids].each do |user_id|
      RoomUser.create(user_id: user_id, room: @room)
    end
    render json: { room: @room }
  end

  def show
    @room = Room.find_by(id: params[:id])
    if @room
      render json: { messages: @room.messages }
    else
      render json: { msg: 'まだやりとりしていません！' }
    end
  end

  private

  def room_params
    params.require(:room).permit(:name, user_ids: [])
  end
end
