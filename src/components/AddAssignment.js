import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Assignment from './Assignment.js';
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';;

class AddAssignment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignmentName: '',
            dueDate: '',
            courseName: ''
        };
    }

    assignmentChangeHandler = (event) => {
        this.setState({assignmentName: event.target.value});
    }

    dueDateChangeHandler = (event) => {
        this.setState({dueDate: event.target.value});
    }

    courseNameChangeHandler = (event) => {
        this.setState({courseName: event.target.value});
    }


    mySubmitHandler = (event) => {
        event.preventDefault();
        //this.state.assignmentName, this.state.dueDate, this.state.courseName
        const token = Cookies.get('XSRF-TOKEN');

        var assignmentName = this.state.assignmentName;
        var dueDate = this.state.dueDate;
        var courseName = this.state.courseName
      
      fetch(`${SERVER_URL}assignment?name=` + assignmentName + `&dueDate=` + dueDate + `&courseID=` + courseName,
        {
          method: 'POST',
          headers: { 'X-XSRF-TOKEN': token }
        })
    .then(res => {
        if (res.ok) {
          toast.success("A new Assignment has been added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.log("A new Assignment has been added");
          alert("The assignment" + assignmentName + " has been created!")
        } else {
          toast.error("Error, course not added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Error Status =' + res.status);
        }})
      .catch(err => {
        toast.error("Error, course not added", {
              position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
      })
      }

    render() {
        
         return (
             <div>
            <div className="App">
             <h4>Please Fill out the following form to submit a new Assignment </h4>
             
             <form onSubmit={this.mySubmitHandler}>
                <p>Enter the Assignment Name</p>
                <input name='assignmentName' onChange={this.assignmentChangeHandler} />
                <p>Enter the due Date</p>
                <input type="date" name='dueDate' onChange={this.dueDateChangeHandler}  />
                <p>Enter the Course ID</p>
                <input variant="outlined" type="number" name='courseName' onChange={this.courseNameChangeHandler}/>
                <input type="submit"/>
            </form>
             
            <Button component={Link} to={{pathname:'/'}} 
                        variant="outlined" color="secondary"  style={{margin: 50}}>
                  Return Home
                </Button>
             <ToastContainer autoClose={1500} /> 
             </div>
             </div>
             
         )
     }
    
 }
export default AddAssignment;