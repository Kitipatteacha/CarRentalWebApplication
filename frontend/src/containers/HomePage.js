import React, { Component } from "react";
import { Container } from "react-bootstrap";
import classes from './HomePage.module.css';
import QueryFilter from '../components/QueryFilter/QueryFilter';
import CarCards from '../components/CarCard/CarCards';
//import CarJumbotron from '../components/Jumbotron/Jumbotron';
import axios from 'axios';
import withErrorHandler from "../hoc/withError";

class HomePage extends Component {
  state = {
    location: '',
    fromDate: null,
    toDate: null,
    loading: false,
    cars: [], //fetch from server
  }

  onChangeHandler = (payload) => {
    const newState = {
      ...this.state,
      location: payload.location
    }
    this.setState(newState)
  }

  searchHandler() {
    //ยิง GET request 
    this.setState({ loading: true })
    axios.get('/api/cars')
      .then(res => {
        this.setState({ loading: false })
        const cars = [...res.data];
      })
      .catch(err => {
        this.setState({ loading: false })
      });
  }

  render() {
    return (
      <>
        <div className={classes.Filter} style={{ textAlign: "center" }}><QueryFilter change={this.onChangeHandler} /></div>
        <div className={classes.Div}>
          <Container>
            <CarCards cars={this.state.cars} />
          </Container>
        </div>
      </>
    );
  }
}

export default withErrorHandler(HomePage,axios);
