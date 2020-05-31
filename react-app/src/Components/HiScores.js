import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import * as api from "../Actions/CrudActions";

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
        await api.crudActions(
            "/Hiscores/", 
            api.ACTION_TYPES.GET_ALL,
            (result) => {setHiScores(result);},
            );
        setIsLoaded(true);
    };

    return (
        <Grid container justify={"center"} alignItems={"center"}>
            <Grid item xs={12}>
                <Link className="no-underline" to="/">
                    <Button 
                    variant={"outlined"}
                    color={"primary"}
                    fullWidth
                    >
                        Return to homepage
                    </Button>
                </Link>
            </Grid>
            {
                isLoaded ? 
                hiScores.map((user, index) => {
                    console.log(user.submitDate);
                    return(
                        <div 
                        key={index}  
                        >
                            <Grid container item alignItems={"center"}>
                                <h3>{index + 1}. {user.userName}: {user.hiScore} points.</h3>
                            </Grid>
                        </div>
                    );
                })
                :
                "Loading HiScores"
            }  
        </Grid>
    );
}

export default withRouter(HiScores);