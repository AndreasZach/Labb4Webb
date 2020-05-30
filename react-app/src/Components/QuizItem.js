import React, { useState } from "react";
import * as api from "../Actions/CrudActions";
import { Button } from "@material-ui/core";
import Timer from "./Timer";

const QuizItem = props => {
    const initialState = {
        correctAnswer: {},
        completed: false,
        timeLeft: 30
    };
    const [{correctAnswer, completed, timeLeft}, setState] = useState(initialState);

    const resetState = () => {
        setState({...initialState});
    };

    const handleClick = async value => {
        let apiResult = await api.crudActions(
            "/questions/", 
            api.ACTION_TYPES.GET_ID,
            null,
            props.quizItemProp.questionId
            );
        if(apiResult.answer === value)
            props.incrementPoints(timeLeft);
        setState(prevState => ({
            ...prevState, 
            ...initialState
        }));    
    };

    let completedBtnColor = correctAnswer ? "primary" : "secondary";
    let btnColor = completed ? completedBtnColor : "default";
    return(
        <div>
            <p>{props.quizItemProp.questionString}</p>
            {
                props.quizItemProp.answerOptions.map((answer, index) => {
                    return (
                    <div key={index}>
                        <Button
                        onClick={() => handleClick(answer)}
                        variant={(completed ? "contained" : "outlined")}
                        color={btnColor}
                        disabled={completed}
                        value={answer}
                        label={answer}
                        >
                            {answer}
                        </Button>
                    </div>
                    );
                })
            }
            <Timer setQuizItemState={setState} completed={completed} timeLeft={timeLeft} />
            {
                completed ?
                <Button onClick={() => props.nextQuestion(resetState)} variant="outlined" color="primary">
                    Next
                </Button> 
                :
                null
            }
        </div>
    );
}

export default QuizItem;