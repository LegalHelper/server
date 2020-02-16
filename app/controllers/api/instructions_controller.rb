class Api::InstructionsController < ApplicationController

  def new
  end

  def create
    instruction = Instruction.create! instruction_params
    if instruction
      render json: instruction
    else
      render json: instruction.errors
    end
  end

  def index
    instructions = Instruction.all.order(created_at: :desc)
    render json: instructions
  end

  def show
    instruction = Instruction.find(params[:id])
    render json: instruction
  end

  def destroy
    instruction = Instruction.find(params[:id])
    instruction.destroy
    render json: { message: "Instruction with id #{params[:id]} deleted." }
  end

  private

  def instruction_params
    params[:instruction].permit(:title, :instruction_type, :description, :image, :actions)
  end
end
