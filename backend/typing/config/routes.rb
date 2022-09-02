Rails.application.routes.draw do
  resources :submissions
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "test", to: "test#show"
end
