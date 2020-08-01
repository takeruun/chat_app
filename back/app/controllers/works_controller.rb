class WorksController < ApplicationController
  def create
    start_time = Time.zone.now.strftime('%Y-%m-%d %H:%M:%S')
    @work = Work.new(user_id: work_params[:user_id], status: work_params[:status], start_time: start_time)
    if @work.save
      render json: { msg: 'がんばりましょ！', work: @work }
    else
      render status: 500, json: { msg: @work.errors.full_messages }
    end
  end

  def update
    @work = Work.find_by(id: params[:id])
    @work.end_time = Time.zone.now.strftime('%Y-%m-%d %H:%M:%S')
    if @work.save
      render json: { msg: 'お疲れ様でした！' }
    else
      render status: 500, json: { msg: @work.erros.full_messages }
    end
  end

  private

  def work_params
    params.require(:work).permit(:status, :user_id)
  end
end
