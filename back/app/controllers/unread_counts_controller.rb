class UnreadCountController < ApplicationController
  def show
    @unread_count = UnreadCount.find_by(id: params[:id])
    if unread_count_params[:flag]
    else
    end
  end

  private
  def unread_count_params
    params.require(:unread_count).permit(:flag)
  end
end