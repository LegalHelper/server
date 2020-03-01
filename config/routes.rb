Rails.application.routes.draw do
  namespace :api do
    resources :instructions
    post '/instructions/:id/create_step' => 'instructions#create_step'
    post '/instructions/update_step' => 'instructions#update_step'
    delete '/instructions/delete_step' => 'instructions#delete_step'
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
