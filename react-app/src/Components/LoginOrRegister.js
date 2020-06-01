import React, {useState, Fragment} from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import AccountActions from "../Actions/Account";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
}));

const LoginOrRegister = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        userName: "",
        password: ""
    });

    const validate = (fieldValues = values) => {
        let validationErrors = {...errors};
        if ('userName' in fieldValues){
            if(fieldValues.userName.length > 12)
                validationErrors.userName = "Username cannot contain more than 12 characters";
            else if((/[^A-Za-z0-9]/).test(fieldValues.userName))
                validationErrors.userName = "Username can only contain characters A-Z and 0-9"; 
            else if(!fieldValues.userName) 
                validationErrors.userName = "Username field cannot be empty";
            else
                validationErrors.userName = "";
        }
        if ('password' in fieldValues){
            validationErrors.password = fieldValues.password.length < 4 ? "Password must contain 4 or more characters" : "";
            validationErrors.password = fieldValues.password.length < 13 ? "" : "Password cannot contain more than 12 characters";
        };
        setErrors({...validationErrors});
        if (fieldValues === values)
            return Object.values(validationErrors).every(x => x === "");
    };
  
    const handleChange = (e) => {
        const {name, value} = e.target;
        const fieldValue = {[name]: value};
        setValues({
            ...values,
            ...fieldValue
        });
        validate(fieldValue);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        resetForm();
        setOpen(false);
    };
  
    const resetForm = () => {
        setValues({
            userName: "",
            password: ""
        });
        setErrors({});
    };

    const handleSubmit = () => {
        if(validate()){
            AccountActions.accountAction(
                props.apiAction, 
                props.handleUserChange,
                values
            );
        }
    };

    return (
      <Fragment>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth>
          {props.action}
        </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{props.action}</DialogTitle>
              <DialogContent className={classes.root}>
              <DialogContentText>
                Enter a Username and Password.
              </DialogContentText>
                <TextField
                name = "userName"
                variant = "outlined"
                label = "Username"
                value = {values.userName}
                onChange = {handleChange}
                fullWidth
                {...(errors.userName && { error: true, helperText: errors.userName })}
                />
                <TextField
                name = "password"
                variant = "outlined"
                label = "Password"
                type = "password"
                value = {values.password}
                onChange = {handleChange}
                autoComplete="off"
                fullWidth
                {...(errors.password && { error: true, helperText: errors.password })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  {props.action}
                </Button>
              </DialogActions>
            </Dialog>
    </Fragment>
    );
  };

export default LoginOrRegister;