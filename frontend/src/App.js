import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import AboutPage from "./containers/AboutPage";
import LoginPage from "./containers/LoginPage";
import ResultPage from "./containers/ResultPage";
import HowToUsePage from "./containers/HowToUsePage";
import CarDetail from "./containers/CarDetail/CarDetail";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./containers/RegisterPage";
import AddCarPage from "./containers/AddCarPage/AddCarPage";

import testPage from "./containers/test/testPage";

class App extends Component {
  render() {
    return (
      <div>
        {/* <Profile /> */}
        {/* <LoginComponent/> */}
        <div style={{ marginBottom: "69.64px" }}>
          <Navbar />
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/car/:id" component={CarDetail} />
            <Route path="/about" component={AboutPage} />
            <Route path="/result" component={ResultPage} />
            <Route path="/test" component={testPage} />
            <Route path="/howtouse" component={HowToUsePage} />
            <Route path="/regis" component={RegisterPage} />
            <Route path="/addcar" component={AddCarPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
