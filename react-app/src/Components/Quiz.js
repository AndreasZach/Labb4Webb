import React, {useState, useEffect} from "react";
import { Button } from "@material-ui/core";
import QuizItem from "./QuizItem";
import QuizComplete from "./QuizComplete";
import * as quizItemApi from "../Actions/QuizItems";

const Quiz = props => {

    const initialState = {
        quizItems: [],
        currentQuestion: 0,
        points: 0,
        isLoaded: false,
        inProgress: false,
        quizComplete: false
    };

    const [{quizItems, currentQuestion, points, isLoaded, inProgress, quizComplete}, 
        setState] = useState(initialState)

    useEffect(() => {
        if(!isLoaded){
            quizItemApi.quizItemAction(
                quizItemApi.ACTION_TYPES.GET_ALL,
                quizLoaded
            );
        }
    });

    const setNewState = (propName, value) => {
        setState(prevState => ({
            ...prevState,
            [propName]: value
        }));
    }

    const quizLoaded = (data) =>{
        setNewState("quizItems", data);
        setNewState("isLoaded", true)
    }

    const resetQuiz = () => {
        setState({...initialState});
    }

    const incrementPoints = () => {
        setNewState("points", points + 1);
    }

    const goToNextQuestion = (resetQuizItem) => {
        if(currentQuestion + 1 >= quizItems.length){
            setNewState("quizComplete", true)
        }else{
            setNewState("currentQuestion", currentQuestion + 1);
            resetQuizItem();
        }
    }

    return(
        !quizComplete ?
            ((isLoaded && inProgress) ?
                <div>
                    <Button onClick={resetQuiz}>
                        Stop Quiz
                    </Button>
                <label>Current points: {points}</label>
                    <QuizItem
                    quizItemProp={quizItems[currentQuestion]}
                    incrementPoints={incrementPoints}
                    nextQuestion={goToNextQuestion}
                    />
                </div>
                :
                <Button onClick={() => setNewState("inProgress", true)}>
                    Start Quiz!
                </Button>)
        :
            <QuizComplete userId={props.userId} points={points} resetQuiz={resetQuiz} />
    );
}

export default Quiz;