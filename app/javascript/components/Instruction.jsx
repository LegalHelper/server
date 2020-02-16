import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Instruction extends Component {
  state = {
    instruction: {}
  }

  componentDidMount = () => {
    const { match: { params: { id } } } = this.props
    this.getInstruction(id)
  }

   getInstruction = async(id) => {
     const url = `/api/instructions/${id}`

     try {
       const response = await fetch(url)
       if (response.ok) {
         const data = await response.json()
         this.setState({instruction: data})
       } else {
         alert('Ошибка HTTP: ' + response.status)
         this.props.history.push('/instructions')
       }
     } catch (err) {
       console.log(err)
       this.props.history.push('/instructions')
     }
   }

   deleteInstruction = (id) => async() => {
     const url = `/api/instructions/${id}`
     const token = document.querySelector('meta[name="csrf-token"]').content;
     try {
       const res = await fetch(url, { method: 'DELETE', headers: { "X-CSRF-Token": token } })
       this.props.history.push('/instructions')
     } catch(err) {
       console.log(err)
     }
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
