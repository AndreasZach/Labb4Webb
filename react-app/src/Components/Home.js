import React, { useState } from "react";
import Header from "./Header";
import { Container } from "@material-ui/core";
import Quiz from "./Quiz";

const Home = props => {
    
    const [currentUser, setCurrentUser] = useState({
      id: 0, 
      userName: "",
      isAdmin: {}
    });
    
    const handleUserChange = (userData) => {
      setCurrentUser({
        id: userData.id,
        userName: userData.userName,
        isAdmin: userData.isAdmin
      });
      console.log(currentUser);
    }

    return(
        <Container>
          <h1>{currentUser.id ? currentUser.userName : "Not logged in"}</h1>
          <Header 
          currentUser={currentUser} 
          handleUserChange={handleUserChange} 
          />
          {
          currentUser.id ?
          <Quiz userId={currentUser.id} />
          :
          "You must be logged in to start the Quiz"
          }
        </Container>
    );
}

export default Home;