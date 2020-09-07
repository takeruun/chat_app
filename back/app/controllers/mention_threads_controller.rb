class MentionThreadsController < ApplicationController
  def index
    @threads = MentionThread.where(id: OutgoingThread.where(user_id: params[:current_user_id]).select('mention_thread_id AS id'))

    if @threads.exists?
      render json: { threads: @threads }
    else
      render json: { msg: 'まだスレッドはありませんよ' }
    end
  end

  def create
    @thread = MentionThread.new(content: thread_params[:content], user_id: thread_params[:current_user_id], room_id: thread_params[:room_id])

    if @thread.save
      thread_params[:user_ids].each do |user_id|
        OutgoingThread.create(mention_thread: @thread, user_id: user_id)
      end
      render json: { thread: @thread }
    else
      render jsos: { msg: 'スレッド作成失敗しました', err_msg: @thread.erros.full_messages }
    end
  end

  private

  def thread_params
    params.require(:thread).permit(:content, :current_user_id, :room_id, user_ids: [])
  end
end
