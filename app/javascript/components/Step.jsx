import React, { Component } from 'react'


export default class Step extends Component {
  state = {
    step: {
      parent: null,
      title: '',
      description: '',
      image: '',
      children: []
    }
  }

  onChange = (event) => {
    this.setState({ step: { ...this.state.step, [event.target.name]: event.target.value } })
  }

  onSubmit = () => {
    console.log('submit step')
  }

  render() {
    const { step } = this.state
    return (
      <div className="card p-2 m-2">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="instructionTitle">Название шага:</label>
            <input
              type="text"
              name="title"
              id="instructionTitle"
              className="form-control"
              required
              onChange={this.onChange}
              value={step.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructionImage">Ссылка на картинку шага:</label>
            <input
              type="text"
              name="image"
              id="instructionImage"
              className="form-control"
              required
              onChange={this.onChange}
              value={step.image}
            />
          </div>
          <label htmlFor="description">Описание шага:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            required
            onChange={this.onChange}
            value={step.description}
          />
        </form>
      </div>
    )
  }
}

const styles = {
  containerRow: {
    backgroundColor: 'green',
    justifyContent: 'space-arround'
  }
}
