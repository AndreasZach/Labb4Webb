import React,  {useEffect} from "react";
import tick from "../Sounds/tick.wav";

const tickAudio = new Audio(tick);

const Timer = props => {  
    useEffect(() => {
      if(!props.timeLeft && props.completed)
        return;
      if (!props.timeLeft && !props.completed)
        props.handleTimeout();
      if(!props.completed){
        const interval = setInterval(() => {
            tickAudio.play();
            props.setTimeLeft(props.timeLeft - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [props.timeLeft, props.setTimeLeft, props.completed]);
    
    const getColor = () => {
        if(props.timeLeft >= 20)
            return "color-green";
        if(props.timeLeft >= 10)
            return "color-orange";
        if(props.timeLeft < 10)
            return "color-crimson";
    }

    return (
      <div>
        <h1 className={getColor()}>{props.timeLeft}</h1>
      </div>
    );
  };

export default Timer;