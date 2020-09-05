import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createList } from "../../store/action";

class ListCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      openAddList: false,
    };
  }

  replaceElm = () => {
    return this.setState({ openAddList: true });
  };

  handleBlankListName = () => {
    let { name } = this.state;
    console.log(name);
    if (!name.trim()) {
      return this.setState({ openAddList: false });
    }
  };

  handleCloseAddList = () => {
    return this.setState({ name: "", openAddList: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { name } = this.state;
    name = name.trim();
    if (!name) {
      return this.setState({ name: "" });
    }
    this.setState({ name: "" });
    let { boardSlug } = this.props.match.params;
    return this.props.dispatch(
      createList({ name }, boardSlug, this.props.history)
    );
  };

  hanleInput = ({ target: { name, value } }) => {
    return this.setState({ [name]: value });
  };

  render() {
    let { name, openAddList } = this.state;
    return (
      <div className="list_form_wrapper">
        {!openAddList ? (
          <>
            <p className="placeholder" onClick={this.replaceElm}>
              +&nbsp;&nbsp;Add a list
            </p>
          </>
        ) : (
          <>
            <form
              className="list_form"
              onSubmit={this.handleSubmit}
              onBlur={this.handleBlankListName}
            >
              <input
                type="text"
                value={name}
                name="name"
                placeholder="Enter list title..."
                onChange={this.hanleInput}
              />
              <div className="btn_wrapper">
                <button type="submit" className="add_btn">
                  Add List
                </button>
                <button onClick={this.handleCloseAddList}>X</button>
              </div>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default connect()(withRouter(ListCreateForm));
