import React, { Component } from 'react'
import { update_step } from '../api'


export default class Step extends Component {
  constructor(props) {
    super(props)
    //  step: { id: number, parent: null || number, title: '', description: '', image: '', children: [], ... },
    this.state = {
      step: {
        title: props.step.title,
        image: props.step.image || '',
        description: props.step.description
      },
      editMode: props.editMode || false
    }
  }

  assembleStep = () => {
    return { ...this.props.step, ...this.state.step }
  }

  onChange = (event) => {
    this.setState({ step: { ...this.state.step, [event.target.name]: event.target.value } })
  }

  onSubmit = () => {
    this.update_step()
  }

  onBlur = () => {
    const { step, editMode } = this.state
    if (step.title.length === 0 || step.description.length === 0) return
    this.update_step()
  }

  update_step = async() => {
    const step = this.assembleStep()
    const res = await update_step({step})
    this.props.saveCallback && this.props.saveCallback(step)
  }

  changeEditMode = () => {
    this.setState({ ...this.state, editMode: !this.state.editMode })
  }

  render() {
    const { step } = this.state
    console.log('step', step)
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
              onBlur={this.onBlur}
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
              onBlur={this.onBlur}
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
            onBlur={this.onBlur}
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
