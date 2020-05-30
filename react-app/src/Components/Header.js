import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import AccountActions from "../Actions/Account";
import AccountFormDialog from "./AccountFormDialog";

const Header = props => {
    const actions = AccountActions.ACTION_TYPES;

    if(!props.currentUser.id){
        return (
            <div>
                <AccountFormDialog 
                accountAction={actions.LOGIN}
                handleSubmit={(userData) => AccountActions.accountAction(
                    actions.LOGIN, 
                    props.handleUserChange,
                    userData
                )} 
                />
                <AccountFormDialog 
                accountAction={actions.REGISTER}
                handleSubmit={(userData) => AccountActions.accountAction(
                    actions.REGISTER, 
                    props.handleUserChange,
                    userData
                )} 
                />
            </div>
        );
    } else {
        return (
            <div>
                <Button onClick={
                    () => AccountActions.accountAction(
                        actions.LOGOUT, 
                        props.handleUserChange,
                    )}
                >
                    Logout
                </Button>                
                {
                props.currentUser.isAdmin ?
                    <Link className="no-underline" to="/manage-questions">
                        <Button>
                            Manage Questions
                        </Button>
                    </Link>
                :
                    null
                }
            </div>
        );
    }
}

export default withRouter(Header);