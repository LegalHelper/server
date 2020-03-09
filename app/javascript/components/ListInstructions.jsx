import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get_instructions } from '../api'

export default class ListInstructions extends Component {
  state = {
    instructions: []
  }

  componentDidMount = () => {
    this.getInstructions()
  }

  getInstructions = async() => {
    try {
      const instructions = await get_instructions()
      this.setState({instructions})
    } catch(e) {
      alert("Ошибка загрузки инструкций: " + e.message)
      this.props.history.push("/")
    }
  }

  renderInstructions = () => {
    const { instructions } = this.state
    return (
      <>
        {instructions.map((instr) => (
          <div key={String(instr.id)} className="col-md-6 col-lg-4">
            <div className="card mb-4">
              <img
                src={instr.image}
                className="card-img-top"
                alt={`${instr.title} image`}
              />
              <div className="card-body">
                <h5 className="card-title">{instr.title}</h5>
                <Link to={`/instructions/${instr.id}`} className="btn custom-button">
                  Посмотреть инструкцию
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  renderEmptyInstructions = () => {
    return (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          Пока нет созданных инструкций. <Link to="/create_instruction">Создать</Link>
        </h4>
      </div>
    )
  }

  render() {
    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Полный список инструкций LegalHelper</h1>
            <p className="lead text-muted">
              Эти инструкции помогут очень и очень многим людям,
              в совершенно разных жизненных ситуациях.
              Спасибо, что потратили свое время на их составление!
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/create_instruction" className="btn custom-button">
                Создать новую инструкцию
              </Link>
            </div>
            <div className="row">
              {this.state.instructions.length > 0 ? this.renderInstructions() : this.renderEmptyInstructions()}
            </div>
            <Link to="/" className="btn btn-link">
               Главная страница
            </Link>
          </main>
        </div>
      </>
    )
  }
}
