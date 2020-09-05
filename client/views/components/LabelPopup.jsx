import React, { Component } from "react";
import { connect } from "react-redux";
import { editCardInfo } from "../../store/action";

class SmallPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelColors: [],
      search: "",
    };
  }

  componentDidMount() {
    let { labelColors } = this.props.singleCard;
    return this.setState({ labelColors });
  }

  handleSelect = ({ target }) => {
    let { labelColors } = this.state;
    let { color } = target.dataset;
    let index = labelColors.indexOf(color);
    if (index >= 0) {
      labelColors = labelColors.filter((labelColor) => labelColor != color);
    } else {
      labelColors = [...labelColors, color];
    }
    return this.setState({ labelColors });
  };

  handleInput = ({ target: { name, value } }) => {
    return this.setState({ search: value.toLowerCase() });
  };

  handleSubmit = () => {
    let { labelColors } = this.state;
    let card = this.props.singleCard;
    let { slug, listSlug } = card;
    if (labelColors.length) {
      this.props.handleLabelPopup()
      return this.props.dispatch(editCardInfo({ labelColors }, listSlug, slug));
    }
  };
  render() {
    let { labelColors, search } = this.state;
    search = search.trim();
    let allColors = [
      ["green", "#60bd4f"],
      ["yellow", "#f2d737"],
      ["orange", "#fea03f"],
      ["red", "#eb5a46"],
      ["purple", "#c376e0"],
      ["blue", "#0078bf"],
    ];
    let filteredColors = allColors.filter(
      (color) =>
        color[0].trim().startsWith(search) || color[1].trim().startsWith(search)
    );
    let colors = search ? filteredColors : allColors;
    let card = this.props.singleCard;

    return (
      <div className="label_popup">
        <div className="color_bar_wrapper">
          <div className="popup_header">
            <p className="popup_heading">
              Labels
              <span onClick={this.props.handleLabelPopup} className="close_btn">
                <i className="fas fa-times"></i>
              </span>
            </p>
          </div>
          <hr />
          <input
            type="text"
            name="search"
            className="search_color"
            onChange={this.handleInput}
            placeholder="Search labels..."
          />
          <h3>LABELS</h3>
          {!colors.length ? (
            <p>No Colour found!</p>
          ) : (
            <>
              {colors.map((color) => {
                return (
                  <div
                    className="color_bar"
                    style={{ backgroundColor: `${color[1]}` }}
                    data-color={color[1]}
                    onClick={this.handleSelect}
                  >
                    {labelColors.includes(color[1]) ? (
                      <i class="fas fa-check"></i>
                    ) : (
                      <> </>
                    )}
                  </div>
                );
              })}
              <button onClick={this.handleSubmit} className="save_btn">
                Save
              </button>{" "}
            </>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ singleCard }) {
  return { singleCard };
}

export default connect(mapStateToProps)(SmallPopup);
