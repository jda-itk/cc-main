class SklforumsController < ApplicationController  
    
  def index
    json_data = { name: "Sample Category", slug: "sample-category",  }

    render json: json_data    
  end

end