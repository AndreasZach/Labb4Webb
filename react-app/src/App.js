import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import QuestionList from "./Components/QuestionList";
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: 0, 
    userName: "",
    isAdmin: {},
    token: ""
  });
  
  const handleUserChange = (userData) => {
    setCurrentUser({
      id: userData.id,
      userName: userData.userName,
      isAdmin: userData.isAdmin,
      token: userData.token
    });
  }


  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home currentUser={currentUser} handleUserChange={handleUserChange} />
        </Route>
        <Route  path='/manage-questions'>
          <QuestionList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
