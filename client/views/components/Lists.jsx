import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllList } from "../../store/action";
import SingleList from "./SingleList";
import Loader from "./Loader";

class Lists extends Component {
  componentDidMount() {
    let { boardSlug } = this.props.match.params;
    return this.props.dispatch(getAllList(boardSlug));
  }

  render() {
    let { allList } = this.props;
    if (!allList) {
      return <Loader />;
    }
    return (
      
      <ul className="lists">
        {allList.map((list, pos) => {
          return <SingleList list={list} />;
        })}
      </ul>
    );
  }
}

function mapStateToProps({ allList }) {
  return { allList };
}

export default connect(mapStateToProps)(withRouter(Lists));
