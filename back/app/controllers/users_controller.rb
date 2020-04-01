# frozen_string_literal: true

class UsersController < ApplicationController
  def index; end

  def create
    @user = User.new(
      email: params[:email],
      password: params[:password],
      name: params[:username]
    )

    if @user.save
      session[:user_id] = @user.id
      render json: { user: @user, text: 'user作成しました', token: @user.token }
    elsif @user.errors.full_messages
      render json: { text: @user.errors.full_messages }
    end
  end
end
