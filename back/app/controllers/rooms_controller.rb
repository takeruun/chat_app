# frozen_string_literal: true

class RoomsController < ApplicationController
  def index
    @room = Room.find_by(room_name: params[:roomName])
    if @room
      @messages = @room.messages
      render json: { chatdata: @messages, room_id: @room.id }
    else
      room = Room.create(room_name: params[:roomName])
      render json: { text: "room作成しました #{room.room_name}", room_id: room.id, chatdata: [] }
    end
  end
end
