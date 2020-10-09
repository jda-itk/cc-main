# name: cc-main
# about: plugin to add school forums 
# version: 0.1.0
# authors: Junel Astucia

enabled_site_setting :cc_main_enabled

after_initialize do
    load File.expand_path('../app/controllers/sklforums_controller.rb', __FILE__)
  
    Discourse::Application.routes.append do
      # Map the path `/forums` to `SchoolforumsController`’s `index` method
      get '/forums' => 'sklforums#index'
    end
end