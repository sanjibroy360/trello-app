import React, { Component } from "react";
import { Button, Checkbox, Form, Segment, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { userSignup } from "../../store/action";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
      usernameAvailable: true,
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let { name, email, password, username } = this.state;
    let payload = { name, email, password, username };
    return this.props.dispatch(userSignup(payload, this.props.history));
  };

  isUsernameAvailable = () => {
    if (this.state.username) {
      let user = axios
        .get(`/user/${this.state.username}`)
        .then(({ data: { user } }) => {
          if (user.username) {
            this.setState({ usernameAvailable: false });
          }
        })
        .catch((error) => this.setState({ usernameAvailable: true }));
    }
  };

  render() {
    let { name, email, password, username, usernameAvailable } = this.state;
    return (
      <div className="container">
        <Segment className="form_wrapper">
          {!usernameAvailable && (
            <Message negative>Username is not available!</Message>
          )}
          <h3 className="form_heading">Sign up for your account</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                type="text"
                value={username}
                placeholder="Enter username"
                name="username"
                onChange={this.handleInput}
                onBlur={this.isUsernameAvailable}
              />
            </Form.Field>
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
                placeholder="Create password"
                name="password"
                onChange={this.handleInput}
              />
            </Form.Field>
            <p className="accept_policy">
              By signing up, I accept the Atlassian Cloud Terms of Service and
              acknowledge the Privacy Policy.
            </p>
            {username && name && email && password.length >= 8 ? (
              <Button type="submit" className="submit_btn">
                Sign up
              </Button>
            ) : (
              <button className="submit_btn disable_btn" disabled>
                Sign up
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
export default connect((state) => state)(Signup);
