class InstructionsController < ApplicationController

  def new
  end

  def create
    puts params
    Instruction.create instruct_type: params[:instruct_type], title: params[:title], text: params[:text]
    redirect_to instructions_path
  end

  def index
    @instructions = Instruction.all
  end

  def show
    @instruction = Instruction.find(params[:id])
  end

  def destroy
    instruction = Instruction.find(params[:id])
    instruction.destroy
    redirect_to instructions_path
  end
end
