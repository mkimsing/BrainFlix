import React from "react";
// =============================================================================
//                Header Section
// =============================================================================
function Header() {
  return (
    <header>
      <div className='flexContainer'>
        <div className="logo" />
        <UploadForm />

      </div>
    </header>
  );
}

function SearchBar() {
  return <input type="text" placeholder="Search" id="searchForm__input" />;
}

function UploadForm() {
  return (
    <form id="searchForm">
      <SearchBar />
      <div className="uploadContainer">
        <button id="searchForm__uploadButton">Upload</button>
        <div className="profile-avatar" />
      </div>
    </form>
  );
}

export default Header;
