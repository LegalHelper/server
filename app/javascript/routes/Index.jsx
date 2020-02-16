import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Main from "../components/MainInstructions"
import ListInstructions from '../components/ListInstructions'
import Instruction from '../components/Instruction'

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/instructions" exact component={ListInstructions} />
      <Route path="/instructions/:id" exact component={Instruction} />
    </Switch>
  </Router>
)
