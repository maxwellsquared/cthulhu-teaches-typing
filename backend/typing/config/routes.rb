Rails.application.routes.draw do
  resources :submissions
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get 'test', to: 'test#show'
  get 'signup', to: 'users#new'
  get 'login', to: 'sessions#new'
  get 'logout', to: 'sessions#destroy'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  resources :users, except: [:new]

  post 'submit', to: 'submissions#create'
  get 'api/leaderboard', to: 'submissions#show'
  get 'api/user/:id', to: 'submissions#history'
  post 'keyboards/new', to: 'keyboards#create' # create a new keyboard for a user
  get 'keyboards/:id', to: 'keyboards#show' # get keyboard by user_id
  delete 'keyboards/:id', to: 'keyboards#destroy' #delete keyboard by keyboard_id

  match '*all', controller: 'application', action: 'cors_preflight_check', via: [:options]
end
