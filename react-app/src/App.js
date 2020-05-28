import React from "react";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Home from "./Components/Home";
import QuestionList from "./Components/QuestionList";
import './App.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={withRouter(Home)} />
        <Route  path='/manage-questions' component={withRouter(QuestionList)} />
      </Switch>
    </Router>
  );
}

export default App;
