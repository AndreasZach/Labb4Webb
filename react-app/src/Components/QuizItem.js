import React, {useState} from "react";
import { getById } from "../Actions/Api";
import {Button} from "@material-ui/core";

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
        let response = await getById(props.quizItemProp.questionId, "/questions/", false);
        let result = await response.json();        
        if(result.answer === value)
            props.incrementPoints();
        setState(prevState => ({
            ...prevState, 
            completed: true
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