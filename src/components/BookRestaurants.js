import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import Api from '../Api'

class BookRestaurants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedDate: new Date(),
            numberOfPeople:''
        }
    }
    openDialog = () => {
        this.setState({
            openDialog: true
        })
    }
    dialogClose = () => {
        this.setState({
            openDialog: false
        })
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };
    handleChange = name => event => {
        this.setState({numberOfPeople:event.target.value})
    };
    submitDetails = ()=>{
        //console.log(this.props.userId,this.props.restaurantId,this.state.selectedDate,this.state.numberOfPeople)
        Api.bookRestaurants(this.props.userId,this.props.restaurantId,this.state.selectedDate,this.state.numberOfPeople)
        .then(bookResto=>{
            console.log("booked")
        })
        .catch(err=>err.message)
        this.setState({
            openDialog:false
        })
    }
    render() {
        const { selectedDate } = this.state;
        return (
            <div>
                <Button size="small" color="primary" onClick={this.openDialog}>
                    Book a table
                    </Button>
                <Dialog open={this.state.openDialog} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Please select your booking details</DialogTitle>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <DatePicker
                                margin="normal"
                                label="Date picker"
                                value={selectedDate}
                                onChange={this.handleDateChange}
                            />
                            <TimePicker
                                margin="normal"
                                label="Time picker"
                                value={selectedDate}
                                onChange={this.handleDateChange}
                            />
                            <TextField
                                id="standard-name"
                                label="Number of Peoples"
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <DialogActions>
                        <Button onClick={this.dialogClose} color="primary">
                            Cancel
              </Button>
                        <Button onClick={this.submitDetails} color="primary">
                            Submit
              </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default BookRestaurants;