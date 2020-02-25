import React from "react"
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import Step from './Step'
import {responsiveHeight} from '../utils'
import produce from 'immer'

class CreateInstruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: {
        title: '',
        instruction_type: '',
        image:'',
        description: '',
      },
      steps: {}
    }
    //this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  onChangeInstruction = (event) => {
    this.setState({ instruction: { ...this.state.instruction, [event.target.name]: event.target.value } })
  }

  onSubmit = async(event) => {
    event.preventDefault()
    const url = "/api/instructions"
    const { instruction } = this.state;
    // if (instruction.title.length == 0 || instruction.length == 0 || instruction.length == 0)
    //   return;
    const body = { instruction }
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
        this.setState({...this.state, instruction})
        //this.props.history.push(`/instructions/${instruction.id}`)
      } else {
        console.log('response', res)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  addStep = (parent_id) => async() => {
    event.preventDefault()
    const url = `/api/instructions/${this.state.instruction.id}/create_step`
    const token = document.querySelector('meta[name="csrf-token"]').content
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({step: {parent: parent_id}})
      })
      if (res.ok) {
        const step = await res.json()
        this.setState(produce(draft => {
          draft.steps[step.id] = step
          if (draft.steps[parent_id]) {
            draft.steps[parent_id].children.push(step.id)
          }
          return draft
        }))
      } else {
        console.log('response', res)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  renderInstruction = () => {
    return (
      <div className="card p-2 align-self-center">
        <h2 className="font-weight-normal mb-5">
           Описание инструкции:
        </h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="instructionTitle">Название инструкции:</label>
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
            <label htmlFor="instruction_type">Тип инструкции:</label>
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
            <label htmlFor="instructionImage">Ссылка на картинку к инструкции:</label>
            <input
              type="text"
              name="image"
              id="instructionImage"
              className="form-control"
              required
              onChange={this.onChangeInstruction}
            />
          </div>
          <label htmlFor="description">Описание инструкции:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="8"
            required
            onChange={this.onChangeInstruction}
          />
          <div style={styles.instructionButtons}>
            <Link to="/instructions" className="btn btn-link mt-3">
              Назад к списку
            </Link>
            <button type='submit' className="btn custom-button mt-3">
              Создать инструкцию
            </button>
          </div>
        </form>
      </div>
    )
  }

  getTreeDeep = () => {
    const { steps } = this.state
    const get_deep = (step_ids, count = 0) => {
      if (step_ids.length === 0) return count
      const deep_children = step_ids.map(id => get_deep(steps[id].children, count +1))
      return Math.max(...deep_children)
    }
    const rootSteps = Object.keys(steps).filter(id => steps[id].parent === null)
    return get_deep(rootSteps)
  }

  getColumnIndices = () => {
    const deep = this.getTreeDeep()
    const columns = []
    for (let i = 0; i <= deep; i += 1) { columns.push(i) }
    return columns
  }

  collectSteps = (column) => {
    const { steps } = this.state

    const collect = (step_id, deep) => {
      if (deep === 1) return {parent_id: step_id, children: steps[step_id].children}
      return steps[step_id].children.map(id => collect(id, deep - 1))
    }

    const rootSteps = Object.keys(steps).filter(id => steps[id].parent === null)
    if (column === 0) return [{parent_id: null, children: rootSteps}]
    return rootSteps.map(id => collect(id, column)).flat(column-1)
  }

// [ {[parent_id]: '', children: [children_ids]}, ...]
  renderStepsColumn = (deep) => {
    const steps = this.collectSteps(deep)
    console.log('steps column', steps)
    return (
      <InfiniteScroll dataLength={steps.length} height={responsiveHeight(98)} style={styles.scroll}>
        {steps.map((step) => this.renderStepsBlock(step))}
      </InfiniteScroll>
    )
  }

  renderStepsBlock = ({parent_id, children}) => {
    return (
      <div className='card' key={parent_id} style={styles.block}>
        {Boolean(parent_id) && <h2 className="font-weight-normal mb-1">{this.state.steps[parent_id].title}</h2>}
        {this.state.instruction.id && (
          <button type='button' className="btn custom-button m-5" onClick={this.addStep(parent_id)}>
            Добавить шаг
          </button>
        )}
        {children.map((id, i) => <Step key={String(i)} step={this.state.steps[id]}/>)}
      </div>
    )
  }

  render() {
    console.log('instruction ', this.state.instruction)
    const columns = this.getColumnIndices()
    return (
      <div className="container-fluid">
        <div className="row m-2" style={styles.containerRow}>
          {this.renderInstruction()}
          {columns.map(this.renderStepsColumn)}
        </div>
      </div>
    )
  }
}


const styles = {
  containerRow: {
    justifyContent: 'space-arround',
    alignItems: 'center'
  },
  instructionButtons: {
    alignItems: 'stretch',
    justifyContent: 'space-beetween'
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    flex:1,
    selfAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export default CreateInstruction
