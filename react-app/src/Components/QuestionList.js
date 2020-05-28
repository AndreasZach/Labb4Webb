import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as questionApi from "../Actions/CrudActions"
import QuizItem from "./QuestionItem";

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
        <div>
            <Link className="no-underline" to="/">
                    <Button>
                        Home
                    </Button>
            </Link>
            {
                isLoaded ? 
                    questions.map((question, index) => {
                        return(
                            <QuizItem 
                            key={index}
                            question={question} 
                            api={questionApi} 
                            updateQuestions = {fetchQuestions}
                            />
                        );
                    })
                :
                "Loading..."
            }
        </div>
    );
}

export default ManageQuestions;