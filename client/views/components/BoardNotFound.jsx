import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function BoardNotFound(props) {
  let {userInfo} = props;
  return (
    <div className="error_wrapper">
      <h3>Board not found.</h3>
      <p>
        This board may be private.{" "}
        {!userInfo.token ? (
          <>
            You may be able to view it by <Link to="/login">logging in</Link>.
          </>
        ) : (
          ""
        )}
        
      </p>
    </div>
  );
}

function mapStateToProps({ userInfo }) {
  return { userInfo };
}

export default connect(mapStateToProps)(BoardNotFound);
