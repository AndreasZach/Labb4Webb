import React, {useState, Fragment} from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const AccountFormDialog = props => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
      userName: "",
      password: ""
  });
  const validate = (fieldValues = values) => {
      let validationErrors = {...errors};
      if ('userName' in fieldValues)
          validationErrors.userName = fieldValues.userName ? "" : "Username field cannot be empty";
      if ('password' in fieldValues){
        validationErrors.password = fieldValues.password.length < 4 ? "Password must contain 4 or more characters" : "";
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
    setOpen(false);
    resetForm();
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
        props.handleSubmit(values);
        handleClose();
      }
      else
        alert("Error"); // add proper error handling
  }
  return (
    <Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth>
        {props.action}
      </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.action}</DialogTitle>
            <DialogContent>
            <DialogContentText>
              Enter a Username and Password.
            </DialogContentText>
            <TextField
              name = "userName"
              variant = "outlined"
              label = "Username"
              value = {values.userName}
              onChange = {handleChange}
              {...(errors.userName && { error: true, helperText: errors.fullName })}
              fullWidth
              />
              <TextField
              name = "password"
              variant = "outlined"
              label = "Password"
              type = "password"
              value = {values.password}
              onChange = {handleChange}
              {...(errors.password && { error: true, helperText: errors.password })}
              fullWidth
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

export default AccountFormDialog;