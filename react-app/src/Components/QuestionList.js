import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import * as questionApi from "../Actions/CrudActions"
import QuestionItem from "./QuestionItem";

const ManageQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(!isLoaded)
            fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        if(isLoaded)
            setIsLoaded(false);
        questionApi.crudActions("/questions/", questionApi.ACTION_TYPES.GET_ALL, setQuestions);
        setIsLoaded(true);
    };

    return(
        <Grid container justify="center" alignItems={"center"} spacing={2} item xs={10}>
            <Grid item xs={6}>
                <Link className="no-underline" to="/">
                    <Button variant={"outlined"} color={"primary"} fullWidth>
                        Home
                    </Button>
                </Link>
            </Grid> 
            {/*This QuestionItem is not passed a question prop, so when clicked, it will open a blank form
                where the user can create a new question.*/}
            <QuestionItem 
            api={questionApi} 
            updateQuestions={fetchQuestions} 
            />
            {
                isLoaded ? 
                    questions.map((question, index) => {
                        return(
                            <Grid key={index} container justify="center" item xs={12}>
                                <QuestionItem
                                question={question} 
                                api={questionApi} 
                                updateQuestions = {fetchQuestions}
                                />
                            </Grid>
                        );
                    })
                :
                "Loading..."
            }
        </Grid>
    );
}

export default withRouter(ManageQuestions);