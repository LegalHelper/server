import React from "react"
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import Step from './common/Step'
import Instruction from './common/Instruction'
import { responsiveHeight } from '../utils'
import produce from 'immer'
import { create_step } from '../api'

class CreateInstruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: {},
      steps: {}
    }
  }

  instructionCallback = (instruction) => {
    this.setState({instruction})
  }

  addStep = (parent_id) => async() => {
    event.preventDefault()
    const body = { step: { parent: parent_id } }
    const step = await create_step(this.state.instruction.id, body)

    this.setState(produce(draft => {
      draft.steps[step.id] = step
      if (draft.steps[parent_id]) {
        draft.steps[parent_id].children.push(step.id)
      }
      return draft
    }))
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

  stepSaveCallback = (step) => {
    this.setState(produce((draft) => {
      draft.steps[step.id] = step
      return draft
    }))
  }

  renderSteps = () => {
    const columns = this.getColumnIndices()
    return (
      <div className="col-12 col-md-8 col-xl-9 horizontal-scroll">
          {columns.map(this.renderStepsColumn)}
      </div>
    )
  }

// [ {parent_id: '', children: [children_ids]}, ...]
  renderStepsColumn = (index) => {
    const steps = this.collectSteps(index)
    return (
      <InfiniteScroll key={String(index)} className="mx-2 align-items-center justify-content-center"
                      dataLength={steps.length} height={responsiveHeight(98)}>
        {steps.map((step) => this.renderStepsBlock(step))}
      </InfiniteScroll>
    )
  }

  renderStepsBlock = ({parent_id, children}) => {
    return (
      <div key={parent_id} className='card my-4 align-items-center'>
        {Boolean(parent_id) && <h2 className="font-weight-normal mb-1">{this.state.steps[parent_id].title}</h2>}
        {this.state.instruction.id && (
          <button type='button' className="btn custom-button mx-5 my-1" onClick={this.addStep(parent_id)}>
            Добавить шаг
          </button>
        )}
        {children.map((id, i) => <Step key={String(i)} step={this.state.steps[id]}
                                       editMode autoSave saveCallback={this.stepSaveCallback}/>)}
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row align-items-center">
          <Instruction editMode saveCallback={this.instructionCallback} />
          {this.renderSteps()}
        </div>
      </div>
    )
  }
}

export default CreateInstruction
