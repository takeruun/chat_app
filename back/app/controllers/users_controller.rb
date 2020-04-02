# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    if @current_user
      render json: { user: @current_user }
    else
      render json: { text: 'userなし' }
    end
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: { user: @user, text: 'ログインしました' }
    end
  end

  def signup
    @user = User.new(
      email: params[:email],
      password: params[:password],
      name: params[:username]
    )

    if @user.save
      session[:user_id] = @user.id
      render json: { user: @user, text: 'user作成しました' }
    else
      render json: { text: @user.errors.full_messages }
    end
  end

  def logout
    session[:user_id]  = nil
    render json: { text: 'ログアウトしました' }
  end

end
