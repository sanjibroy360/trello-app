import React, { Component } from "react";
import { Button, Checkbox, Form, Segment, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { getVerificationCode } from "../../store/action";

class VerifyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value.trim() });
  };

  handleSubmit = () => {
    let { email, username } = this.state;
    let payload = { email, username };
    this.props.dispatch(getVerificationCode(payload, this.props.history));
  };

  render() {
    let { email, username } = this.state;
    return (
      <div className="container">
        <Segment className="form_wrapper">
          <h3 className="form_heading">Verify user</h3>
          <Form onSubmit={this.handleSubmit}>
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

            {username && email ? (
              <Button type="submit" className="submit_btn">
                Continue
              </Button>
            ) : (
              <button className="submit_btn disable_btn" disabled>
                Continue
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

export default connect()(VerifyUser);
