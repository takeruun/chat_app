class UnreadCountsController < ApplicationController
  def index
    count = ReadedMessage.where(
      room_id: unread_count_params[:room_id],
      user_id: unread_count_params[:user_id],
      is_read: false
    ).count

    @unread_count = UnreadCount.find_by(
      room_id: unread_count_params[:room_id],
      user_id: unread_count_params[:user_id]
    ).update(count: count)
    if @unread_count
      render json: { unread_count: count }
    else
      render json: { msg: 'まだありません' }
    end
  end

  def update
    @unread_count = UnreadCount.find_by(id: params[:id])
    ReadedMessage.create(
      message_id: unread_count_params[:message_id],
      user_id: unread_count_params[:user_id],
      room_id: unread_count_params[:room_id],
      is_read: unread_count_params[:flag]
    ) if ReadedMessage.find_by(
      message_id: unread_count_params[:message_id],
      user_id: unread_count_params[:user_id],
      room_id: unread_count_params[:room_id],
      is_read: true
    ).nil?

    count = ReadedMessage.where(
              user_id: unread_count_params[:user_id],
              room_id: unread_count_params[:room_id],
              is_read: false
            ).count

    if unread_count_params[:flag]
      @unread_count.update(count: 0)
    else
      @unread_count.update(count: count)
    end
    render json: {}
  end

  def reset
    ReadedMessage.where(
      user_id: unread_count_params[:user_id],
      room_id: unread_count_params[:room_id],
      is_read: false
    ).update(is_read: true)
    render json: { msg: '既読' } if UnreadCount.find_by(room_id: unread_count_params[:room_id], user_id: unread_count_params[:user_id]).update(count: 0)
  end

  private

  def unread_count_params
    params.require(:unread_count).permit(:flag, :message_id, :user_id, :room_id)
  end
end
