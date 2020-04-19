import React, { Component } from 'react'
import { update_step, delete_step } from '../../api'
import { IoMdCreate, IoIosTrash, IoMdCheckmark ,IoMdClose } from 'react-icons/io'

// props: step, editMode, autoSave , withButtons, saveCallBack, deleteCallBack
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

  onBlur = () => {
    const { autoSave } = this.props
    const { step } = this.state
    if (!autoSave || step.title.length === 0 || step.description.length === 0) return
    this.updateStep()
  }

  updateStep = async() => {
    const step = this.assembleStep()
    const res = await update_step({step})
    this.props.saveCallback && this.props.saveCallback(step)
  }

  changeEditMode = () => {
    this.setState({ ...this.state, editMode: !this.state.editMode })
  }

  deleteStep = async() => {
    const { id } = this.props.step
    const text = 'Внимание! При удалении шага, так же будут удалены все его дочерние шаги. Удалить?'
    if (confirm(text)) {
      try {
        await delete_step(id)
        this.props.deleteCallback && this.props.deleteCallback(id)
      } catch(e) {
        alert("Не получилось удалить шаг, попробуйте обновить страницу: " + e.message)
      }
    }
  }

  onSuccessEditPress = () => {
    this.updateStep()
    this.changeEditMode()
  }

  onCancelEditPress = () => {
    const { title, image, description } = this.props.step
    this.setState({
      ...this.state,
      editMode: !this.state.editMode,
      step: { title, description, image: image || '' }
    })
  }

  renderButtons = () => {
    const { editMode } = this.state
    if (editMode) {
      return (
        <div className="row justify-content-end px-3">
          <button type="button" className="btn-sm btn-outline mx-1" onClick={this.onSuccessEditPress}>
            <IoMdCheckmark size={24}/>
          </button>
          <button type="button" className="btn btn-sm custom-button mx-1" onClick={this.onCancelEditPress}>
            <IoMdClose size={24}/>
          </button>
        </div>
      )
    } else {
      return (
        <div className="row justify-content-end px-3">
          <button type="button" className="btn-sm btn-outline mx-1" onClick={this.changeEditMode}>
            <IoMdCreate size={24}/>
          </button>
          <button type="button" className="btn btn-sm custom-button mx-1" onClick={this.deleteStep}>
            <IoIosTrash size={24}/>
          </button>
        </div>
      )
    }
  }

  render() {
    const { withButtons } = this.props
    const { step } = this.state
    console.log('step', step)
    return (
      <div className="card p-2 m-2">
        { withButtons && this.renderButtons() }
        <form onSubmit={this.updateStep}>
          <div className="form-group">
            <label htmlFor="instructionTitle">Название шага (что ответили):</label>
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
          <label htmlFor="description">Описание шага (что делать сейчас):</label>
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
