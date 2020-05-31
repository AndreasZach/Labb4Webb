import React, { useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import * as api from "../Actions/CrudActions";

const QuizComplete = props => {
    useEffect(() => {
        requestPutHiScore();
    }, []);
    
    const requestPutHiScore = async () => {
        try {
            await api.crudActions(
                "/Hiscores/", 
                api.ACTION_TYPES.PUT,
                null,
                props.userId,
                props.points,
            );
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <Grid container justify="center" alignItems="center" item xs={8}>
            <Grid container justify="center" item xs={12}>
                <h3>You've completed the Quiz!</h3>
            </Grid>
            <Grid container justify="center" item xs={12}>
                <h3>Your final score was {props.points}!</h3>
            </Grid>
            <Grid item xs={12}>
                <Button 
                variant={"outlined"}
                color={"primary"}
                onClick={() => props.resetQuiz()}
                fullWidth
                >
                    Restart Quiz
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Link className="no-underline" to="/user-hiscores">
                    <Button 
                    variant={"outlined"}
                    color={"primary"}
                    fullWidth
                    >
                        Show Hiscores
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
};

export default withRouter(QuizComplete);