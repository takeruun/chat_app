# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: { user: @user, text: 'ログインしました' }
    else
      render json: { text: 'メールアドレス or パスワードが間違っています' }
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
    session[:user_id] = nil
    render json: { text: 'ログアウトしました' }
  end

  def user
    if @current_user
      render json: { user: @current_user }
    else
      render json: { text: 'userなし' }
    end
  end

end
