class MainController < ApplicationController
  def index
    @level_name = params[:level] || '0010_opening'
    @start_direction = params[:start_direction] || nil
    @start_x = params[:x] || nil
    @start_y = params[:y] || nil
  end

end
