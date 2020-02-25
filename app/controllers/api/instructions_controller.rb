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

  def create_step
    instruction = Instruction.find(params[:id])
    step = instruction.steps.create! step_params
    if step.parent
      parent_step = Step.find(step.parent)
      parent_step.children.push(step.id)
      parent_step.save!
    end

    if step
      render json: step
    else
      render json: step.errors
    end
  end

  def update_step
    instruction = Instruction.find(params[:id])
    instruction.steps.update! step_params
    status :ok
  end

  private

  def instruction_params
    params[:instruction].permit(:title, :instruction_type, :description, :image)
  end

  def step_params
    params[:step].permit(:parent, :title, :description, :image, :children)
  end
end
