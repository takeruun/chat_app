# frozen_string_literal: true

class UsersController < ApplicationController
  include JwtAuthenticator

  def index
    @users = User.all
    render json: @users
  end

  def login
    @current_user = User.find_by(email: params[:email])
    if @current_user&.authenticate(params[:password])
      jwt_token = encode(@current_user.id)
      render json: { user: @current_user, text: 'ログインしました', token: jwt_token }
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
      jwt_token = encode(@user.id)
      render json: { user: @user, text: 'user作成しました', token: jwt_token }
    else
      render json: { text: @user.errors.full_messages }
    end
  end

  def logout
    render json: { text: 'ログアウトしました' }
  end

  def user
    # token = request.headers["Authorization"] headers指定の場合
    payload = decode(params[:token])
    @current_user = User.find_by(id: payload['user_id'])
    render json: { user: @current_user }
  end
end
