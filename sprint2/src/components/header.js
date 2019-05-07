import React from "react";
import { Link } from "react-router-dom";
// =============================================================================
//                Header Section
// =============================================================================
//TODO use link around logo
function Header() {
  return (
    <header>
      <div className="flexContainer">
        <div className="logo" />
        <UploadForm />
      </div>
    </header>
  );
}

function UploadForm() {
  return (
    <form id="searchForm">
      <input type="text" placeholder="Search" id="searchForm__input" />
      <div className="uploadContainer">
        <button id="searchForm__uploadButton">UPLOAD</button>
        <div className="profile-avatar" />
      </div>
    </form>
  );
}

export default Header;
