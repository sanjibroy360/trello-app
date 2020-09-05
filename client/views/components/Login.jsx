import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Form, Segment } from "semantic-ui-react";
import { userLogin } from "../../store/action";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    return this.props.dispatch(userLogin(this.state, this.props.history));
  };

  render() {
    let { email, password } = this.state;
    return (
      <div className="container">
        <Segment className="form_wrapper">
          <h3 className="form_heading">Log in to Trello</h3>
          <Form onSubmit={this.handleSubmit}>
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
              <Link to="/forgot-password">
                <small>Forget password</small>
              </Link>
            </Form.Field>

            <Button type="submit" className="submit_btn login_btn">
              Log in
            </Button>
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

export default connect()(Login);
