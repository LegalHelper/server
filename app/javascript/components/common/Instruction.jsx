import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { create_instruction, update_instruction} from '../../api'

export default class Instruction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instruction: props.instruction || {
        title: '',
        instruction_type: '',
        image:'',
        description: '',
      },
      editMode: props.editMode
    }
  }

  onChangeInstruction = (event) => {
    this.setState({ instruction: { ...this.state.instruction, [event.target.name]: event.target.value } })
  }

  createInstruction = async(event) => {
    event.preventDefault()
    const body = { instruction: this.state.instruction }
    const instruction = await create_instruction(body)
    this.setState({...this.state, instruction})
    this.props.saveCallback && this.props.saveCallback(instruction)
  }

  updateInstruction = async(event) => {
    event.preventDefault()
    const { instruction } = this.state
    const body = { instruction }
    const res = await update_instruction(instruction.id, body)
    this.setState({ ...this.state, instruction: res })
    this.props.saveCallback && this.props.saveCallback(res)
  }

  render() {
    const { instruction, editMode } = this.state
    return (
        <div className="col-12 col-md-4 col-xl-3">
        <div className="card p-2 mx-0 align-items-center">
          <div className="instruction-image-container m-2">
            {instruction.image && instruction.image.startsWith('http') ?
              <img className="img-fluid rounded"
                   src={instruction.image}
                   alt={`${instruction.title} image`}
              /> :
              <img className="rounded"
                   src={"/assets/add_image.png"}
                   style={{opacity: 0.5, tintColor: 'grey', maxWidth: '100%'}}
                   alt={`${instruction.title} image`}
              />
            }
          </div>
          <h3 className="font-weight-normal mb-3">
             Описание инструкции:
          </h3>
          <form onSubmit={instruction.id ? this.updateInstruction : this.createInstruction}>
            <div className="form-group">
              <label htmlFor="instructionTitle">Название инструкции:</label>
              <input
                type="text"
                name="title"
                id="instructionTitle"
                className="form-control"
                value={instruction.title}
                required
                onChange={this.onChangeInstruction}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="instruction_type">Тип инструкции:</label>
              <select className="form-control"
                      name="instruction_type"
                      id="instruction_type"
                      value={instruction.instruction_type}
                      required
                      onChange={this.onChangeInstruction}
                      disabled={!editMode}
              >
                <option value=''>Не выбрано</option>
                <option value="interactive">Интерактивная инструкция</option>
                <option value="base_instruction">Базовая инструкция</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="instructionImage">Ссылка на картинку к инструкции:</label>
              <input
                type="text"
                name="image"
                id="instructionImage"
                className="form-control"
                value={instruction.image}
                required
                onChange={this.onChangeInstruction}
                disabled={!editMode}
              />
            </div>
            <label htmlFor="description">Описание инструкции:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={instruction.description}
              rows="8"
              required
              onChange={this.onChangeInstruction}
              disabled={!editMode}
            />
            <div className="d-flex">
              <Link to="/instructions" className="btn btn-link mt-3">
                Назад к списку
              </Link>
            { editMode && (<button type='submit' className="btn custom-button mt-3">
                {instruction.id ? 'Сохранить' : 'Создать'}
              </button>)
            }
            </div>
          </form>
        </div>
        </div>
      )
  }
}
