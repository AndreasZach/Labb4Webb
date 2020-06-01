import React, {useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import QuizItem from "./QuizItem";
import QuizComplete from "./QuizComplete";
import * as api from "../Actions/CrudActions";

const Quiz = props => {

    const initialState = {
        quizItems: [],
        currentQuestion: 0,
        points: 0,
        isLoaded: false,
        quizComplete: false
    };

    const [{quizItems, currentQuestion, points, isLoaded, quizComplete}, 
        setState] = useState(initialState);

    useEffect(() => {
        if(!isLoaded){
            api.crudActions(
                "/quizitems",
                api.ACTION_TYPES.GET_ALL,
                quizLoaded
            );
        }
    }, [isLoaded]);

    const setNewState = (propName, value) => {
        setState(prevState => ({
            ...prevState,
            [propName]: value
        }));
    };

    const quizLoaded = (data) =>{
        setNewState("quizItems", data);
        setNewState("isLoaded", true)
    };

    const resetQuiz = () => {
        setState({...initialState});
    };

    const incrementPoints = (timeLeft = 0) => {
        setNewState("points", points + (1 + timeLeft));
    };

    const goToNextQuestion = (resetQuizItem) => {
        if(currentQuestion + 1 >= quizItems.length){
            setNewState("quizComplete", true);
        }else{
            setNewState("currentQuestion", currentQuestion + 1);
            resetQuizItem();
        }
    };

    return(
        !quizComplete ?
            isLoaded ?
                <Grid container item xs={8} spacing={1}>
                    <Grid container justify="center" item xs={12}>
                        <Link className="no-underline" to="/">
                            <Button variant="contained" color="secondary" onClick={resetQuiz} fullWidth>
                                Stop Quiz
                            </Button>
                        </Link>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        Question: {currentQuestion + 1}/{quizItems.length}
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        Current points: {points}
                    </Grid>
                    <QuizItem
                    quizItemProp={quizItems[currentQuestion]}
                    incrementPoints={incrementPoints}
                    nextQuestion={goToNextQuestion}
                    />
                </Grid>
            :
            <Grid container justify="center" item xs={12}>
                <p>Loading Quiz...</p>
            </Grid>
            
        :
            <QuizComplete userId={props.userId} points={points} resetQuiz={resetQuiz} />
    );
};

export default withRouter(Quiz);