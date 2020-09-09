import React, { Component } from "react";
import { Button, Checkbox, Form, Segment, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { resetPassword } from "../../store/action";
import { toast } from "react-toastify";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: "",
      password: "",
      confirmPassword: "",
      passwordValidation: "",
      confirmPasswordValidation: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value.trim() });
    if (name == "password" || name == "confirmPassword") {
      return this.handlePasswordValidation(value, name);
    }
  };

  handleSubmit = () => {
    let { password, confirmPassword, verificationCode } = this.state;
    if (!verificationCode) {
      return toast.error(`Verification code is required.`);
    } else if (confirmPassword !== password) {
      return toast.error("Password and confirm must be equal");
    }
    let { username, email } = this.props.userInfo;
    let payload = { username, email, password, verificationCode };
    this.props.dispatch(resetPassword(payload, this.props.history));
  };

  handlePasswordValidation = (password, key) => {
    if (password.trim().length < 8) {
      if (key == "confirmPassword") {
        return this.setState({
          confirmPasswordValidation: `A password must be 8 character long`,
        });
      } else {
        return this.setState({
          passwordValidation: `A password must be 8 character long`,
        });
      }
    } else {
      if (key == "confirmPassword") {
        return this.setState({
          confirmPasswordValidation: "",
        });
      } else {
        return this.setState({
          passwordValidation: "",
        });
      }
    }
  };

  render() {
    let { userInfo } = this.props;
    if (!userInfo.email) {
      this.props.history.push("/login");
      return <></>;
    }
    let {
      password,
      confirmPassword,
      verificationCode,
      passwordValidation,
      confirmPasswordValidation,
    } = this.state;
    return (
      <div className="container">
        <Segment className="form_wrapper">
          <h3 className="form_heading">Reset password</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                type="text"
                value={verificationCode}
                placeholder="Enter verification code"
                name="verificationCode"
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
              {passwordValidation ? (
                <p className="small_error_msg">{passwordValidation}</p>
              ) : (
                <></>
              )}
            </Form.Field>

            <Form.Field>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={this.handleInput}
              />
              {confirmPasswordValidation ? (
                <p className="small_error_msg">{confirmPasswordValidation}</p>
              ) : (
                <></>
              )}
            </Form.Field>

            {password.length >= 8 ? (
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

function mapStateToProps({ userInfo }) {
  return { userInfo };
}

export default connect(mapStateToProps)(ForgotPassword);
