# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    resources :users
    get 'login' => 'users#login'
    post 'logout' => 'users#logout'
    post 'signup' => 'users#signup'
    resources :messages
    resources :rooms
  end
end
