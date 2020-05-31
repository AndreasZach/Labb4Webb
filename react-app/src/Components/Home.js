import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import LoginOrRegister from "./LoginOrRegister";

const Home = props => {
  return(
    <Grid container justify={"center"} item>
      {
      props.currentUser.id ?
        <Fragment>
          <Link className="no-underline" to='/quiz'>
              <Button 
              variant={"contained"}
              color={"primary"}
              >
                  Start Quiz!
              </Button>
          </Link>
        </Fragment>
      :
        <Fragment>
          <Grid container justify="center" item xs={6}>
            <p>You must be logged in to use this app</p>
            <LoginOrRegister action="Login" apiAction={"LOGIN"} handleUserChange={props.handleUserChange} />
            <LoginOrRegister action="Register" apiAction={"REGISTER"} handleUserChange={props.handleUserChange} />
          </Grid>
        </Fragment>
    }
    </Grid>
  );
}

export default withRouter(Home);