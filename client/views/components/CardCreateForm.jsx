import React, { Component } from "react";
import { createCard } from "../../store/action";
import {connect} from "react-redux";

class CardCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }
  handleInput = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;

    this.setState({ name: e.target.value });
  };

  handleSubmit = (event) => {
    let { name } = this.state;
    let { listSlug, closeCardComposer } = this.props;
    name = name.trim();
    if (!name) {
      return this.setState({ name: "" });
    }
    this.props.dispatch(createCard({ name }, listSlug));
    closeCardComposer();
  };

  render() {
    return (
      <div className="card_composer">
        <textarea
          name="name"
          placeholder="Enter a title for this card..."
          onChange={this.handleInput}
        ></textarea>
        <div className="btn_wrapper">
          <button type="submit" className="add_btn" onClick={this.handleSubmit}>
            Add List
          </button>
          <button onClick={this.props.closeCardComposer}>X</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({allList}) {
  return {allList};
}

export default connect(mapStateToProps)(CardCreateForm);
