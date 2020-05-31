import React, { useState, Fragment } from "react";
import * as api from "../Actions/CrudActions";
import { Button, Grid } from "@material-ui/core";
import Timer from "./Timer";

const QuizItem = props => {
    const initialState = {
        correctAnswer: {},
        completed: false
    };
    const [{correctAnswer, completed}, setState] = useState(initialState);

    const resetState = () => {
        setState({...initialState});
    };

    const handleClick = async value => {
        console.log(value)
        let apiResult = await api.crudActions(
            "/questions/", 
            api.ACTION_TYPES.GET_ID,
            null,
            props.quizItemProp.questionId
            );
            console.log(apiResult);
        if(apiResult.answer === value)
            props.incrementPoints();
        setState(prevState => ({
            ...prevState, 
            completed: true
        }));    
    };

    let completedBtnColor = correctAnswer ? "primary" : "secondary";
    let btnColor = completed ? completedBtnColor : "default";
    return(
        <Fragment>
            <Grid container justify="center" item xs={12}>
                <p>{props.quizItemProp.questionString}</p>
            </Grid>
            
            {
                props.quizItemProp.answerOptions.map((answer, index) => {
                    return (
                        <Grid key={index} item xs={12}>
                            <Button 
                            onClick={() => handleClick(answer)}
                            variant={(completed ? "contained" : "outlined")}
                            color={btnColor}
                            disabled={completed}
                            value={answer}
                            label={answer}
                            fullWidth
                            >
                                {answer}
                            </Button>
                        </Grid>
                    );
                })
            }
            {
                completed ?
                    <Grid container justify="flex-start" item xs={12}>
                        <Button onClick={() => props.nextQuestion(resetState)} variant="contained" color="primary" fullWidth>
                            Next
                        </Button> 
                    </Grid>
                :
                    null
            }
        </Fragment>
    );
}
//<Timer setQuizItemState={setState} completed={completed} />


export default QuizItem;