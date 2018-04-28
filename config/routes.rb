Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'landing_page#index'

  namespace :api do
    namespace :v1 do
      resources :networks, only: [:index, :create]
    end
  end
end
