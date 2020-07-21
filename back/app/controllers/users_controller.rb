# frozen_string_literal: true

class UsersController < ApplicationController
  include JwtAuthenticator

  def index
    @users = User.all
    render json: @users
  end

  def login
    @current_user = User.find_by(email: user_params[:email])
    if @current_user&&@current_user.authenticate(user_params[:password])
      jwt_token = encode(@current_user.id)
      render json: { user: @current_user, msg: 'ログインしました', token: jwt_token }
    else
      render json: { msg: 'メールアドレス or パスワードが間違っています' }
    end
  end

  def signup
    @user = User.new(
      name: params[:username],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )

    if @user.save
      jwt_token = encode(@user.id)
      render json: { user: @user, msg: 'user作成しました', token: jwt_token }
    else
      render json: { err_msg: @user.errors.full_messages }
    end
  end

  def logout
    render json: { msg: 'ログアウトしました' }
  end

  def user
    # token = request.headers["Authorization"] headers指定の場合
    payload = decode(params[:token])
    @current_user = User.find_by(id: payload['user_id'])
    render json: { user: @current_user }
  end

  def partner
    @user = User.find_by(id: params[:partner_id])
    render json: { user_name: @user.name }
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render json: { user: @user }
    else
      render json: {}
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
      render json: { user: @user, msg: 'updateしました' }
    else
      render json: { msg: 'update失敗しました', err_msg: @user.errors.full_messages }
    end
  end

  def destroy
    User.find_by(id: params[:id]).destroy
    render json: { msg: 'user削除しました' }
  end

  def user_params
    params.require(:user).permit(:name, :email, :icon, :password, :password_confirmation)
  end
end
