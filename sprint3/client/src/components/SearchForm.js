import React from "react";
import { withRouter, Link } from "react-router-dom";
import AutoCompleteSearch from "./AutoCompleteSearch";
class SearchForm extends React.Component {
  submitHandler = event => {
    event.preventDefault();
    let location = {
      pathname: "/search",
      search: `filter=${event.target.searchField.value}`
    };
    event.target.searchField.value = "";
    this.props.history.push(location);
  };

  render() {
    return (
      <form id="searchForm" onSubmit={this.submitHandler}>
        {/* <button id='searchForm__searchButton'> Search </button> */}
        {/* <input type="text" placeholder="Search" id="searchForm__input" name="searchField" /> */}
        <AutoCompleteSearch />
        <div className="uploadContainer">
          <Link to="/upload">
            <button id="searchForm__uploadButton">UPLOAD</button>
          </Link>
          <div className="profile-avatar" />
        </div>
      </form>
    );
  }
}

export default withRouter(SearchForm);
