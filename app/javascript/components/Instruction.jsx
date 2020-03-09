import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get_instruction, delete_instruction } from '../api'

export default class Instruction extends Component {
  state = {
    instruction: {}
  }

  componentDidMount = () => {
    const { match: { params: { id } } } = this.props
    this.getInstruction(id)
  }

  getInstruction = async(id) => {
    try {
      const instruction = await get_instruction(id)
      this.setState({instruction})
    } catch (e) {
       alert('Ошибка загрузки инструкции: ' + e.message)
       this.props.history.push('/instructions')
    }
  }

  deleteInstruction = (id) => async() => {
    await delete_instruction(id)
    this.props.history.push('/instructions')
   }

  renderInstructionHeader = () => {
    const { instruction } = this.state
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={instruction.image}
            alt={`${instruction.title} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {instruction.title}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Описание инструкции</h5>
              <div>
                <p> {instruction.description} </p>
              </div>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteInstruction(instruction.id)}>
                Удалить инструкцию
              </button>
            </div>
          </div>
          <Link to="/instructions" className="btn btn-link">
            Назад к списку
          </Link>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderInstructionHeader()}
      </div>
    )
  }
}
