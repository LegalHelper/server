import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Main from "../components/MainInstructions"
import ListInstructions from '../components/ListInstructions'
import ShowInstruction from '../components/ShowInstruction'
import CreateInstruction from '../components/CreateInstruction'

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/instructions" exact component={ListInstructions} />
      <Route path="/instructions/:id" exact component={ShowInstruction} />
      <Route path="/create_instruction" exact component={CreateInstruction} />
    </Switch>
  </Router>
)
