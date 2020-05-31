import React from "react";
import AccountActions from "../Actions/Account";
import AccountFormDialog from "./AccountFormDialog";

const Login = props => {

    const usernameValidation = user => {
        return user ? "" : "The username field cannot be empty";
    }

    const passwordValidation = password => {
        if(!password)
            return "The password field cannot be empty";
        else if(password.length < 4)
            return "Password must contain 4 or more characters";
        else
            return "";
    }

    return(
        <AccountFormDialog 
            action={props.action}
            fieldOneValidation={usernameValidation}
            fieldTwoValidation={passwordValidation}
            fieldOneLabel="Username"
            fieldTwoLabel="Password"
            password = {true}
            handleSubmit={(userData) => AccountActions.accountAction(
                props.apiAction,
                props.handleUserChange,
                userData
            )} 
        />
    );
};

export default Login;