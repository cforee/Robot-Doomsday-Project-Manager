class MainController < ApplicationController
  def index
    @level_name = params[:level] || '0010_opening'
  end

end
