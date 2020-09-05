import React, { Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { connect } from "react-redux";
import { editCardInfo } from "../../store/action";

class DueDatePopup extends Component {
  state = {
    selectedDate: new Date(),
    dueDate: "",
  };

  componentDidMount() {
    let card = this.props.singleCard;
    if (card.dueDate) {
      let { dueDate } = card;
      dueDate = new Date(dueDate);
      return this.setState({ dueDate });
    }
  }

  formatDate = (date) => {
    let monthList = "_ Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
      " "
    );
    let month = monthList.indexOf(date[1]);
    month = month > 10 ? month + "" : "0" + month;
    date = `${date[3]}-${month}-${date[2]}T00:00:00`;
    return date;
  };

  handleChange = (date) => {
    date = date.toString().slice(0, 15).split(" ");
    return this.setState({ dueDate: new Date(this.formatDate(date)) });
  };

  handleSubmit = () => {
    let card = this.props.singleCard;
    let { listSlug, slug } = card;
    let { dueDate } = this.state;
    dueDate = dueDate.toString().slice(0, 15).split(" ");

    if (dueDate) {
      let payload = {
        dueDate: this.formatDate(dueDate),
      };
      this.props.handleDueDatePopup();
      return this.props.dispatch(editCardInfo(payload, listSlug, slug));
    }
  };

  handleRemove = () => {
    let card = this.props.singleCard;
    let { listSlug, slug } = card;
    let { selectedDate } = this.state;
    if (selectedDate) {
      let payload = {
        dueDate: "",
      };
      this.props.handleDueDatePopup();
      return this.props.dispatch(editCardInfo(payload, listSlug, slug));
    }
  };

  render() {
    let { dueDate, selectedDate } = this.state;
    let showDate = dueDate ? dueDate : selectedDate;
    return (
      <div className="duedate_popup">
        <div className="popup_header">
          <p className="popup_heading">
            Due Date
            <span onClick={this.props.handleDueDatePopup} className="close_btn">
              <i className="fas fa-times"></i>
            </span>
          </p>
        </div>
        <hr />
        {/* <input type="text" value={showDate} /> */}
        <Calendar onChange={this.handleChange} value={showDate} />
        <div className="btn_wrapper">
          <button className="btn save_btn" onClick={this.handleSubmit}>
            Save
          </button>
          <button className="btn remove_btn" onClick={this.handleRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

// class DueDatePopup extends Component {
//   state = {
//     startDate: new Date(),
//     selectedDate: ""
//   };

//   handleChange = (date) => {
//     let {startDate} = this.state;
//     let diff = date > startDate;
//     console.log(diff);
//     this.setState({
//         selectedDate: date,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <DatePicker
//           selected={this.state.startDate}
//           onChange={this.handleChange}
//         />
//       </div>
//     );
//   }
// }

function mapStateToProps({ singleCard }) {
  return { singleCard };
}

export default connect(mapStateToProps)(DueDatePopup);
