# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    resources :users
    get 'user' => 'users#user'
    get 'login' => 'users#login'
    post 'logout' => 'users#logout'
    post 'signup' => 'users#signup'
    get 'partner' => 'users#partner'
    resources :messages
    resources :rooms
  end
  mount ActionCable.server => '/api/cable'
end
