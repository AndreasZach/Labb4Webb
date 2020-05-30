import React, {useState, useEffect} from "react";
import {Button} from "@material-ui/core";
import HiScores from "./HiScores";
import * as api from "../Actions/CrudActions";

const QuizComplete = props => {
    const [showHiScores, setShowHiScores] = useState(false);

    useEffect(() => {
        if(!showHiScores)
            requestPutHiScore();
    });
    
    const requestPutHiScore = async () => {
        await api.crudActions(
            "/Hiscores/", 
            api.ACTION_TYPES.PUT,
            null,
            props.userId, 
            props.points,
        );
    };

    return(
        showHiScores ?
            <HiScores />
        :
        <div>
            <h1>You've completed the Quiz!</h1>
            <p>Your final score was {props.points}!</p>
            <Button onClick={() => props.resetQuiz()}>
                Back to main page
            </Button>
            <Button onClick={() => setShowHiScores(true)}>
                Show HiScores
            </Button>
        </div>
    );
};

export default QuizComplete;