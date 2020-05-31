import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

const AccessDenied = () => {
    return(
        <Grid container justify="center" item xs={8}>
            <Grid item xs={12}>
                <h1>ACCESS DENIED</h1>
            </Grid>
            <Grid item xs={12}>
                <h4>You either are not logged in, or you do not have the correct role to see the requested page.</h4>
            </Grid>
            <Grid item xs={12}>
              <Link to="/">
                Back to to the main page.
              </Link>
            </Grid>
        </Grid>
    );
}

export default withRouter(AccessDenied);