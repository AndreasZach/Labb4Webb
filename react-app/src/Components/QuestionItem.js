import React, {useState, useEffect} from "react";
import { 
    ButtonGroup, 
    Button, 
    Dialog,
    DialogTitle,
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    TextField } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const QuestionItem = props => {

    const initialState = {
        questionString: "",
        answer: ""
    };
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(initialState);
    useEffect(() => {
        if(props.question.id)
            setValues(props.question);
        else
            setOpen(true);
    }, []);

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

    const handleSubmit = e => {
        let type = props.api.ACTION_TYPES.PUT;
        if(!values.questionString)
            type = props.api.ACTION_TYPES.POST
        
        props.api.crudActions(
            "/questions/", 
            type, 
            props.updateQuestions, 
            props.question.id, 
            values
        );
        toggleOpen();
        props.updateQuestions();
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
        <div>
            <h4>{props.question.questionString}</h4>
            {
                props.question.id ?
                    <ButtonGroup>
                        <Button onClick={toggleOpen}>
                            <Edit />
                        </Button>
                        <Button>
                            <Delete onClick={handleDelete} />
                        </Button>
                    </ButtonGroup>
            :
                null
            }
            <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Question Form</DialogTitle>
                  <DialogContent>
                  <DialogContentText>
                    Enter question details.
                  </DialogContentText>
                  <TextField
                    name = "questionString"
                    variant = "outlined"
                    label = "Question"
                    value = {values.questionString}
                    onChange = {handleChange}
                    fullWidth
                    />
                    {/*...(errors.userName && { error: true, helperText: errors.fullName })*/}
                    <TextField
                    name = "answer"
                    variant = "outlined"
                    label = "Answer"
                    value = {values.answer}
                    onChange = {handleChange}
                    fullWidth
                    />
                    {/*...(errors.password && { error: true, helperText: errors.password })*/}
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
        </div>
    );
}

export default QuestionItem;