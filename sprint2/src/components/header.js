import React from "react";
import { Redirect, Link } from "react-router-dom";
// =============================================================================
//                Header Section
// =============================================================================
//TODO use link around logo
function Header() {
  return (
    <header>
      <div className="flexContainer">
        <Link to="/" className="logo"></Link>
        <UploadForm />
      </div>
    </header>
  );
}

class UploadForm extends React.Component {
  state = {
    query: '',
    toSearch: false
  }

  updateQuery = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.setState({
      query: event.target.searchField.value,
      toSearch: true //TODO reset this in did update?
    })
    event.target.searchField.value = '';
  }

  componentDidUpdate() {
    if (this.state.toSearch === true)
      this.setState({
        toSearch: false
      })
  }

  render() {
    if (this.state.toSearch === true) {
      let location = {
        pathname: '/search',
        search: `filter=${this.state.query}`
      }
      return <Redirect to={location} />
    }
    return (
      <form id="searchForm" onSubmit={this.submitHandler}>
        <button id='searchForm__searchButton'> Search </button>
        <input type="text" placeholder="Search" id="searchForm__input" name="searchField" />
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

export default Header;
