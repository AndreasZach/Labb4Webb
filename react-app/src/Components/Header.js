import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import AccountActions from "../Actions/Account";

const Header = props => {

    return (
        <div>
        <h2>Welcome to my QuizApp!</h2>
        {
            props.currentUser.id ?
                <Grid container justify="center" alignItems={"center"} item>
                    <Link className="no-underline" to="/">
                        <Button 
                        variant={"outlined"}
                        color={"primary"}
                        onClick={
                            () => AccountActions.accountAction(
                                "LOGOUT", 
                                props.handleUserChange,
                            )}
                        >
                            Logout
                        </Button>
                    </Link>
                    {
                    props.currentUser.isAdmin ?
                        <Link className="no-underline" to="/manage-questions">
                            <Button 
                            variant={"outlined"}
                            color={"primary"}
                            >
                                Manage Questions
                            </Button>
                        </Link>
                    :
                        null
                    }
                </Grid>
            :
                null
            }
        </div>
    );
}

export default withRouter(Header);