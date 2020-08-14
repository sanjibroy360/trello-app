import React, { Component } from "react";
import { Button, Checkbox, Form, Segment, Message } from "semantic-ui-react";
import axios from "axios";


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value.trim() });
  };

  handleSubmit = () => {
    let {
      email,
      username,
      name,
      password,
      confirmPassword,
      errorMessage,
    } = this.state;
    if (confirmPassword !== password) {
      return this.setState({
        errorMessage: "Password and confirm should be equal",
      });
    } else if (password.length < 8) {
      return this.setState({
        errorMessage: "Password should be 8 charecter long",
      });
    } else if (errorMessage) {
      this.setState({
        errorMessage: "",
      });
    }

    let payload = { email, username, name, email, password };
    axios
      .put("/user/reset-password", {
        user: payload,
      })
      .then(({ data: { user } }) => {
        if (user.username) {
          this.props.history.push("/login");
        }
      })
      .catch((error) => this.setState({ errorMessage: `User not found!` }));
  };

  render() {
    let {
      name,
      email,
      username,
      password,
      confirmPassword,
      errorMessage,
    } = this.state;
    return (
      <div className="container">
        <Segment className="form_wrapper">
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <h3 className="form_heading">Reset password</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                type="text"
                value={name}
                placeholder="Enter fullname"
                name="name"
                onChange={this.handleInput}
              />
            </Form.Field>

            <Form.Field>
              <input
                type="text"
                value={username}
                placeholder="Enter username"
                name="username"
                onChange={this.handleInput}
              />
            </Form.Field>

            <Form.Field>
              <input
                type="text"
                value={email}
                placeholder="Enter email address"
                name="email"
                onChange={this.handleInput}
              />
            </Form.Field>

            <Form.Field>
              <input
                type="password"
                value={password}
                placeholder="Enter new password"
                name="password"
                onChange={this.handleInput}
              />
            </Form.Field>

            <Form.Field>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={this.handleInput}
              />
            </Form.Field>

            {username && email && password && confirmPassword ? (
              <Button type="submit" className="submit_btn">
                Reset password
              </Button>
            ) : (
              <button className="submit_btn disable_btn" disabled>
                Reset password
              </button>
            )}
          </Form>
        </Segment>
        <div className="wall_image">
          <div>
            <img
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg"
              alt=""
            />
          </div>
          <div>
            <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/0cad30a99820b0d840a5b48635d00b6e/updated-layouts-collab.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
