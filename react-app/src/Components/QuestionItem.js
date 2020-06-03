import React, {useState, useEffect, Fragment} from "react";
import { ButtonGroup, Button, Dialog, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, TextField, Grid, makeStyles} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
  }));

const QuestionItem = props => {
    const classes = useStyles();

    const initialState = {
        questionString: "",
        answer: ""
    };
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if(props.question)
            setValues(props.question);
    }, [setValues, props.question]);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const validate = (fieldValues = values) => {
        let validationErrors = {...errors};
        const checks = (value) => {
            if(value.length > 75)
                return "Field cannot contain more than 75 characters";
            else if(!value)
                return "Field cannot be empty";
            else
                return "";
        }
        if ('questionString' in fieldValues){
            validationErrors.questionString = checks(fieldValues.questionString);
        }
        if ('answer' in fieldValues){
            validationErrors.answer = checks(fieldValues.answer);
        };
        setErrors({...validationErrors});
        if (fieldValues === values)
            return Object.values(validationErrors).every(x => x === "");
    };

    const handleChange = e => {
        const {name, value} = e.target;
        const fieldValue = {[name]: value};
        setValues({
            ...values, 
            ...fieldValue});
        validate(fieldValue);
    }

    const handleSubmit = () => {
        if(validate()){
            if(!props.question){
                props.api.crudActions(
                    "/questions/",
                    props.api.ACTION_TYPES.POST,
                    props.updateQuestions,
                    0,
                    values
                )
                setValues(initialState);
            }else{
                props.api.crudActions(
                    "/questions/", 
                    props.api.ACTION_TYPES.PUT, 
                    props.updateQuestions, 
                    props.question.id,
                    values
                );
            }
            toggleOpen();
        }
    };

    const handleDelete = () => {
        setDisabled(true);
        console.log("disabled")
        props.api.crudActions(
            "/questions/", 
            props.api.ACTION_TYPES.DELETE, 
            props.updateQuestions, 
            props.question.id
        );
        props.updateQuestions();
        setDisabled(false);
        console.log("enabled")
    };

    return(
        <Fragment>
            {
                props.question ?
                    <Fragment>
                        <Grid container justify="center" item xs={6}>
                            <h4>{props.question.questionString}</h4>
                        </Grid>
                        <Grid container justify="center" item xs={6}>
                            <ButtonGroup size="small">
                                <Button variant="outlined" color="primary" onClick={toggleOpen} disable={disabled.toString()}>
                                    <Edit color="primary" />
                                </Button>
                                <Button variant={"outlined"}  color={"secondary"} onClick={handleDelete} disable={disabled.toString()}>
                                    <Delete color={"secondary"}  />
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Fragment>
                :
                    <Grid item xs={6}>   
                        <Button variant="outlined" color="primary" onClick={toggleOpen} fullWidth>
                            Create
                        </Button>
                    </Grid>
            }
            <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Question Form</DialogTitle>
                <DialogContent className={classes.root}>
                    <DialogContentText>
                        Enter question details.
                  </DialogContentText>
                    <TextField
                        name="questionString"
                        variant="outlined"
                        label="Question"
                        value={values.questionString}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        autoComplete="off"
                        {...(errors.questionString && { error: true, helperText: errors.questionString })}
                    />
                    <TextField
                        name="answer"
                        variant="outlined"
                        label="Answer"
                        value={values.answer}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        autoComplete="off"
                        {...(errors.answer && { error: true, helperText: errors.answer })}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button onClick={toggleOpen} color="primary">
                            Cancel
                  </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                  </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default QuestionItem;