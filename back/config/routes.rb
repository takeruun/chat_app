# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    scope :v1 do
      resources :users
      get 'user' => 'users#user'
      get 'login' => 'users#login'
      post 'logout' => 'users#logout'
      post 'signup' => 'users#signup'
      get 'partner' => 'users#partner'
      get 'show' => 'users#show'
      resources :messages
      resources :rooms
      resources :works
      resources :unread_counts
    end
  end
  mount ActionCable.server => '/api/v1/cable'
end
