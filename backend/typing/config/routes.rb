Rails.application.routes.draw do
  resources :submissions
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "test", to: "test#show"
  get "signup", to: "users#new"
  get "login", to: "sessions#new"
  get "logout", to: "sessions#destroy"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  resources :users, except: [:new]
  
  match '*all', controller: 'application', action: 'cors_preflight_check', via: [:options]
end
