import React, { useState, Fragment } from "react";
import * as api from "../Actions/CrudActions";
import { Button, Grid } from "@material-ui/core";
import Timer from "./Timer";

const QuizItem = props => {
    const [correctAnswer, setCorrectAnswer] = useState({});
    const [completed, setcompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    const resetState = () => {
        setCorrectAnswer({});
        setcompleted(false);
        setTimeLeft(30);
    };

    const handleTimeout = () => {
        setCorrectAnswer(false);
        setcompleted(true);
    };

    const handleClick = async value => {
        let apiResponse = await api.crudActions(
            "/questions/", 
            api.ACTION_TYPES.GET_ID,
            null,
            props.quizItemProp.questionId
        );
        if(apiResponse.answer === value){
            props.incrementPoints(timeLeft);
            setCorrectAnswer(true);
        }
        else{
            setCorrectAnswer(false);
        }
        setcompleted(true);
    };

    const getResultMsg = () => {
        if(correctAnswer === true)
            return (
                <Grid className="correctAnswer" container justify="center" item xs={12}>
                    Correct!
                </Grid>);
        else if (correctAnswer === false)
            return (
                <Grid className="incorrectAnswer" container justify="center" item xs={12}>
                    {timeLeft ? "Nope, too bad." : "Time waits for no one"}
                </Grid>);
        else
            return null;
    }

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
                            variant="contained"
                            disabled={completed}
                            value={answer}
                            label={answer}
                            color="primary"
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
                <Grid container justify="center" spacing={3} item xs={12}>
                    {getResultMsg()}
                    <Grid>
                        <Button onClick={() => props.nextQuestion(resetState)} variant="contained" color="primary" fullWidth>
                            Next
                        </Button> 
                    </Grid>
                </Grid>
                :
                    null
            }
            <Grid container item xs={12}>
                <Timer 
                timeLeft={timeLeft} 
                setTimeLeft={setTimeLeft} 
                completed={completed} 
                handleTimeout={handleTimeout} />
            </Grid>
        </Fragment>
    );
}

export default QuizItem;