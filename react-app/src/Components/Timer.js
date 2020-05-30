import React, {useState, useEffect} from "react";

const Timer = props => {
    const [countdown, setCountdown] = useState(30);
    useEffect(() => {
        if(countdown > 0)
            setTimeout(() => setCountdown(countdown - 1), 1000);
        else
            props.setQuizItemState(true);
    });

    return(
        <div>
            <h1>{countdown}</h1>
        </div>
    );
};

export default Timer;