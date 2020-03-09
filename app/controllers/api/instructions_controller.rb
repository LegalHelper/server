class Api::InstructionsController < ApiController

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
    render json: serialize_instruction
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
    step = Step.find(params[:step][:id])
    step.update! step_params

    if step
      render json: step
    else
      render json: step.errors
    end
  end

  def delete_step
    status :ok
  end

  private

  def instruction_params
    params[:instruction].permit(:title, :instruction_type, :description, :image)
  end

  def step_params
    params[:step].permit(:parent, :title, :description, :image, :children)
  end

  def serialize_instruction
    instruction = Instruction.find(params[:id])
    { instruction: instruction, steps: instruction.steps }
  end
end
