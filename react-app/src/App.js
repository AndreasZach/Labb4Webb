import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import QuestionList from "./Components/QuestionList";
import HiScores from "./Components/HiScores";
import Header from "./Components/Header";
import AccessDenied from "./Components/AccessDenied";
import './App.css';

function App() {

  const initialState = {
    id: 0, 
    userName: "",
    isAdmin: {},
    token: ""
  };

  const [currentUser, setCurrentUser] = useState(initialState);
  
  const handleUserChange = (userData) => {
    setCurrentUser(prevState => ({
      ...prevState,
      ...JSON.parse(localStorage.getItem("userData"))
    }));
  }

  useEffect(() => {
    if(localStorage.getItem("userData")){
      let newData = JSON.parse(localStorage.getItem("userData"));
      console.log(newData.id)
      setCurrentUser(prevState => ({
          ...prevState,
          ...newData
      }));
    }
  }, [localStorage.getItem("userData")]);


  return (
    <Grid container justify={"center"} alignItems={"center"} spacing={4}>
      <Router>
        <Grid container justify="center" item xs={12}>
          <Header 
            currentUser={currentUser} 
            handleUserChange={handleUserChange} 
          />
        </Grid>
        <Switch>
          <Route exact path='/'>
            <Home currentUser={currentUser} handleUserChange={handleUserChange} />
          </Route>
          <Route path='/quiz'>
            {
              currentUser.id ?
                <Quiz userId={currentUser.id} />
              :
                <Redirect to="/access-denied" />
            }
          </Route>
          <Route  path='/manage-questions'>
            {
              currentUser.isAdmin ?
                <QuestionList />
              :
                <Redirect to="/access-denied" />
            }
          </Route>
          <Route path='/user-hiScores'>
          {
            currentUser.id ?
              <HiScores />
            :
              <Redirect to="/access-denied" />
          }
          </Route>
          <Route path="/access-denied">
            <AccessDenied />
          </Route>
        </Switch>
      </Router>
    </Grid>
  );
}

export default App;
