import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import { Container } from "@material-ui/core";
import Quiz from "./Quiz";

const Home = props => {

    return(
        <Container>
          <h1>{props.currentUser.id ? props.currentUser.userName : "Not logged in"}</h1>
          <Header 
          currentUser={props.currentUser} 
          handleUserChange={props.handleUserChange} 
          />
          {
          props.currentUser.id ?
          <Quiz userId={props.currentUser.id} />
          :
          "You must be logged in to start the Quiz"
          }
        </Container>
    );
}

export default withRouter(Home);