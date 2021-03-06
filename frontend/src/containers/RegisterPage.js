import React, { Component } from "react";
import "./RegisterPage.css";

import axios from "axios";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Button, Form, Row, Col, FormGroup, Modal } from "react-bootstrap";

const formValid = ({ formErrors, errormessage, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      id: "",
      drivingnumber: "",
      tel: "",
      formvalid: null,
      stage: false,
      chosen: false,
      show: false,
      formErrors: {
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        id: "",
        drivingnumber: "",
        tel: ""
      },
      errormessage: {
        name: "minimum 3 characaters required",
        surname: "minimum 3 characaters required",
        username: "minimum 3 characaters required",
        email: "invalid email",
        password: "minimum 6 characaters required",
        confirmpassword: "confirm password and password are not matching",
        id: "invalid id number",
        drivingnumber: "invalid driving number",
        tel: "invalid telephone number"
      }
    };
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
    this.validateField(name, value);
  };

  validateField(fieldName, value) {
    let formErrors = this.state.formErrors;
    let errorMessage = this.state.errormessage;
    switch (fieldName) {
      case "name":
        console.log(formErrors.name, value);
        formErrors.name = value.length < 3 ? errorMessage.name : "";
        break;
      case "surname":
        formErrors.surname = value.length < 3 ? errorMessage.surname : "";
        break;
      case "username":
        formErrors.username = value.length < 3 ? errorMessage.username : "";
        break;
      case "email":
        formErrors.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? ""
          : errorMessage.email;
        break;
      case "password":
        formErrors.password = value.length < 6 ? errorMessage.password : "";
        break;
      case "confirmpassword":
        formErrors.confirmpassword =
          value === this.state.password ? "" : errorMessage.confirmpassword;
        break;
      case "id":
        formErrors.id = value.length === 13 ? "" : errorMessage.id;
        break;
      case "drivingnumber":
        formErrors.drivingnumber =
          value.length === 10 ? "" : errorMessage.drivingnumber;
        break;
      case "tel":
        formErrors.tel = value.length === 10 ? "" : errorMessage.tel;
        break;
      default:
        break;
    }
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  handleSubmit = e => {
    e.preventDefault();
    let data = {};
    if (formValid(this.state)) {
      data = {
        name: this.state.name,
        surname: this.state.surname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        idCardNum: this.state.id,
        tel: this.state.tel,
        isAuthenticated: true
      };
      axios
        .post("/auth/local", data)
        .then(res => {
          console.log(res);
          this.props.history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    const { formErrors } = this.state;
    const handleClickrenter = () => {
      this.setState({
        chosen: true,
        renter: true
      });
    };
    const handleClickuser = () => {
      this.setState({
        chosen: true,
        user: true
      });
    };

    let display = <p />;
    let user = <p />;
    if (this.state.user === true) {
      user = (
        <div className="drivingnumber">
          <label htmlFor="drivingnumber">Driver Card Number</label>
          <input
            className={formErrors.drivingnumber.length > 0 ? "error" : null}
            placeholder="Driver Card Number"
            type="text"
            name="drivingnumber"
            noValidate
            onChange={this.handleChange}
          />
          {formErrors.drivingnumber.length > 0 && (
            <span className="errorMessage">{formErrors.drivingnumber}</span>
          )}
        </div>
      );
    }
    if (this.state.chosen === true) {
      display = (
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="name">
              <label htmlFor="name">First Name</label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>
            <div className="surname">
              <label htmlFor="surname">Last Name</label>
              <input
                className={formErrors.surname.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="surname"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.surname.length > 0 && (
                <span className="errorMessage">{formErrors.surname}</span>
              )}
            </div>
            <div className="username">
              <label htmlFor="username">User Name</label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                placeholder="User Name"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="confirmpassword">
              <label htmlFor="confirmpassword">Confirm Your Password</label>
              <input
                className={
                  formErrors.confirmpassword.length > 0 ? "error" : null
                }
                placeholder="Confirm Password"
                type="text"
                name="confirmpassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmpassword.length > 0 && (
                <span className="errorMessage">
                  {formErrors.confirmpassword}
                </span>
              )}
            </div>
            <div className="id">
              <label htmlFor="id">ID Number</label>
              <input
                className={formErrors.id.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="id"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.id.length > 0 && (
                <span className="errorMessage">{formErrors.id}</span>
              )}
            </div>
            {user}
            <div className="tel">
              <label htmlFor="tel">Telephone Number</label>
              <input
                className={formErrors.tel.length > 0 ? "error" : null}
                placeholder="Telephone Number"
                type="text"
                name="tel"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.tel.length > 0 && (
                <span className="errorMessage">{formErrors.tel}</span>
              )}
            </div>
            <div className="term">
              <label> I agree to the Terms and Agreements</label>
              <input
                onClick={() => this.setState({ show: true })}
                type="checkbox"
                name="checkbox"
                required
                style={{ display: "flex" }}
              />
            </div>
            <div className="createAccount" style={{ marginBottom: "40px" }}>
              <button type="submit">Create Account</button>
            </div>
          </form>
          <Modal show={this.state.show}>
            <Modal.Header>
              <Modal.Title>Agreement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                This End User License Agreement ("Agreement") is a legal
                agreement between you and CAO NI CAR{" "}
              </p>
              <ul>
                <li>Limited License</li>
                <ul>
                  <li>
                    Use, copy, modify, transmit, adapt, vary or create
                    derivative works based on the Software in whole or part.{" "}
                  </li>
                  <li>
                    Rent, lease, sub-license, sell or otherwise transfer the
                    Software to any third party or allow it (or the
                    Documentation) to be accessed by or copied onto another
                    person's device.
                  </li>
                  <li>
                    Translate, reverse engineer, decompile, or disassemble the
                    Software; or use any access software system to search the
                    data in the Software other than the Software provided under
                    this agreement.
                  </li>
                </ul>
                <li>Prohibited Uses</li>
                <ul>
                  <li>
                    You agree to comply with all applicable laws, rules and
                    regulations. Should you use the Software to break any
                    applicable law, rule, regulation or this Agreement, your
                    right to use the Software shall terminate immediately and
                    without notice. And TouchPal is not liable for any damage or
                    loss resulting from such termination.
                  </li>
                </ul>
                <li>Your Responsibilities</li>
                <ul>
                  <li>
                    In order to offer you more tailored service, TouchPal and/or
                    its partners may provide you with a variety of value-added
                    services or products, free and paid. TouchPal may change the
                    charges payable for the purchase of such Products or
                    Services at any time without any notice to you. You can
                    choose whether or not to accept the new charges prior to
                    completing your next purchase of the applicable Product. The
                    new charges will apply to your next purchase after the new
                    charges have been published.
                  </li>
                  <li>
                    You can use your Google Play account or create a TouchPal
                    Keyboard user account to purchase and use the services or
                    products provided. TouchPal owns the TouchPal Keyboard
                    account and enjoys the right of ownership. You shall obtain
                    the right to use the account after completing the
                    registration process. The right to use the account only
                    belongs to the initial legal registrant. Paid or unpaid
                    transfer, succession and sell are prohibited. You are solely
                    responsible and liable for all activities conducted through
                    your User Account.
                  </li>
                </ul>
                <li>Value-added Services and Products</li>
                <li>No Warranty</li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.setState({ show: false })}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      display = (
        <div
          className="choseImage"
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          <div className="renter" onClick={() => handleClickrenter()}>
            <div className="rentertext">
              <p>RENTER</p>
            </div>
          </div>
          <div className="user" onClick={() => handleClickuser()}>
            <div className="usertext">
              <p>USER</p>
            </div>
          </div>
        </div>
      );
    }
    return <div className="wrapper">{display}</div>;
  }
}

export default RegisterPage;
