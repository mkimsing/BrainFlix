import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

function Header(props) {
  return (
    <header>
      <div className="flexContainer">
        <Link to="/" className="logo" />
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
