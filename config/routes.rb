Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked' #取得 pathパラメーター postsコントローラー checkedメソッド
end