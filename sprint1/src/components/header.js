import React from "react";
// =============================================================================
//                Header Section
// =============================================================================
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
