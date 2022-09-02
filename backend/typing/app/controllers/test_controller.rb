class TestController < ApplicationController

  def show
    render json: 
    {
      a: "Tests",
      b: "anotha"
    }
  end
end
