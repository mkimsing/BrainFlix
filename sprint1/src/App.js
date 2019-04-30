import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

function Header() {
  return <Logo />;
}

function Logo() {
  return <div className="logo" />;
}

function SearchBar() {
  return;
  //Some stuff
}

function UploadSection() {}

export default App;
