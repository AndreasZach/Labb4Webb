import React, {useState, useEffect, Fragment} from "react";
import { 
    ButtonGroup, 
    Button, 
    Dialog,
    DialogTitle,
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    TextField, 
    Grid} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const QuestionItem = props => {

    const initialState = {
        questionString: "",
        answer: ""
    };
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(initialState);
    useEffect(() => {
        if(props.question)
            setValues(props.question);
    }, [setValues, props.question]);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        const fieldValue = {[name]: value};
        setValues({
            ...values, 
            ...fieldValue});
    }

    const handleSubmit = () => {
        console.log(values)
        if(!props.question){
            props.api.crudActions(
                "/questions/",
                props.api.ACTION_TYPES.POST,
                props.updateQuestions,
                0,
                values
            )
        }else{
            props.api.crudActions(
                "/questions/", 
                props.api.ACTION_TYPES.PUT, 
                props.updateQuestions, 
                props.question.id,
                values
            );
        }
    };

    const handleDelete = () => {
        props.api.crudActions(
            "/questions/", 
            props.api.ACTION_TYPES.DELETE, 
            props.updateQuestions, 
            props.question.id
        );
        props.updateQuestions();
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
                                <Button variant="outlined" color="primary" onClick={toggleOpen}>
                                    <Edit color="primary" />
                                </Button>
                                <Button variant={"outlined"}  color={"secondary"}>
                                    <Delete color={"secondary"} onClick={handleDelete} />
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
                <DialogContent>
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
                    />
                    <TextField
                        name="answer"
                        variant="outlined"
                        label="Answer"
                        value={values.answer}
                        onChange={handleChange}
                        fullWidth
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