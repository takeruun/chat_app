class UnreadCountsController < ApplicationController
  def index
    @unread_count = UnreadCount.find_by(unread_count_params)
    if @unread_count
      render json: { unread_count_id: @unread_count.id }
    else
      render json: { msg: 'まだありません' }
    end
  end

  def update
    @unread_count = UnreadCount.find_by(id: params[:id])
    Message.find_by(id: unread_count_params[:message_id]).update(updated_at: Time.now) if unread_count_params[:flag]
  end

  private

  def unread_count_params
    params.require(:unread_count).permit(:flag, :message_id, :user_id, :room_id)
  end
end
