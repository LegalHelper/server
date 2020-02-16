import React from "react";
import { Link } from "react-router-dom";

class CreateInstruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: {
        title: '',
        instruction_type: '',
        image:'',
        description: '',
        actions: [],
      },
      actions: []
    }
    //this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  onChangeInstruction = (event) => {
    this.setState({ instruction: { ...this.state.instruction, [event.target.name]: event.target.value } })
  }

  onSubmit = async(event) => {
    event.preventDefault()
    const url = "/api/instructions"
    const { instruction, actions } = this.state;
    // if (instruction.title.length == 0 || instruction.length == 0 || instruction.length == 0)
    //   return;
    const body = { instruction, actions }
    const token = document.querySelector('meta[name="csrf-token"]').content
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const instruction = await res.json()
        this.props.history.push(`/instructions/${instruction.id}`)
      } else {
        console.log('response', res)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Создайте новую инструкцию для пользователей приложения.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="instructionTitle">Название инструкции</label>
                <input
                  type="text"
                  name="title"
                  id="instructionTitle"
                  className="form-control"
                  required
                  onChange={this.onChangeInstruction}
                />
              </div>
              <div className="form-group">
                <label htmlFor="instruction_type">Тип инструкции</label>
                <select className="form-control"
                        name="instruction_type"
                        id="instruction_type"
                        required
                        onChange={this.onChangeInstruction}
                >
                  <option value="interactive">Интерактивная инструкция</option>
                  <option value="base_instruction">Базовая инструкция</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="instructionImage">Ссылка на картинку к инструкции</label>
                <input
                  type="text"
                  name="image"
                  id="instructionImage"
                  className="form-control"
                  required
                  onChange={this.onChangeInstruction}
                />
              </div>
              <label htmlFor="description">Описание инструкции</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="5"
                required
                onChange={this.onChangeInstruction}
              />
              <button type="submit" className="btn custom-button mt-3">
                Создать инструкцию
              </button>
              <Link to="/instructions" className="btn btn-link mt-3">
                Назад к инструкциям
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateInstruction
