import React, { useState, useEffect } from "react";
import * as api from "../Actions/Api";

const HiScores = props => {
    const [hiScores, setHiScores] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(!isLoaded){
            requestGetHiScores()
            console.log(hiScores)
        }
    });

    const requestGetHiScores = async () => {
        let response = await api.getAll("/Hiscores/", false);
        let result = await response.json();
        setHiScores(result);
        setIsLoaded(true);
    };

    return (
        <div>
            <ol>
            {
                isLoaded ? 
                hiScores.map((user, index) => {
                    console.log(user.submitDate);
                    return(
                        <li 
                        key={index}  
                        >
                            <div>Username: {user.userName}</div>
                            <div>Best Score: {user.hiScore}</div>
                        </li>
                    );
                })
                :
                "Loading HiScores"
            }  
            </ol>
        </div>
    );
}

export default HiScores;