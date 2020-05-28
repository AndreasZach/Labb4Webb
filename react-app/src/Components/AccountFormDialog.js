import React, {useState} from "react";
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
        validationErrors.password = fieldValues.password.length < 3 ? "Password must contain 6 or more characters" : "";
        if(!validationErrors.password)
          validationErrors.password = fieldValues.password ? "" : "Password field cannot be empty";
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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      {props.accountAction}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.accountAction}</DialogTitle>
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
          {props.accountAction}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

export default AccountFormDialog;